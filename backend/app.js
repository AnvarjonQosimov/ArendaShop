const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')

require('dotenv').config()

const app = express()

// app.use(helmet())
app.use(
  helmet({
    crossOriginOpenerPolicy: false
  })
)

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
})

app.use(limiter)

app.use(cors({
  origin: [
    "https://arendashop.uz",
    "https://www.arendashop.uz",
    "http://localhost:3000"
  ]
}))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 }
}))
app.use(express.static('static'))

const PORT_ENV = process.env.PORT || 8080
const DB_URL = process.env.MONGODB_URL

// const dns = require('dns')
// const dnsPromises = dns.promises
// if (process.env.USE_GOOGLE_DNS === 'true') {
//   dns.setServers(['8.8.8.8'])
// }

// ;(async () => {
//   try {
//     // const addrs = await dnsPromises.resolveSrv('_mongodb._tcp.architekture.r1yl3pj.mongodb.net')
//     const clusterHost = DB_URL.split('@')[1].split('/')[0]
//     console.log('SRV addrs', addrs)
//   } catch (err) {
//     console.warn('SRV resolve failed (debug):', err.message)
//   }
// //   await dnsPromises.resolveSrv('_mongodb._tcp.architekture.r1yl3pj.mongodb.net')
// await dnsPromises.resolveSrv(`_mongodb._tcp.${clusterHost}`)
// })()

if (!DB_URL) {
  console.error('MONGODB_URL not set in .env. Exiting.')
  process.exit(1)
}

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

const connectWithRetry = async (retries = 5, delayMs = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(DB_URL, {
        serverSelectionTimeoutMS: 4000
      })
      console.log('DB connected')
      // app.listen(PORT_ENV, () => console.log(`Listen to -- http://localhost:${PORT_ENV}`))
      app.listen(PORT_ENV, () => console.log(`Server running on port ${PORT_ENV}`))
      return
    } catch (e) {
      console.error(`DB connect failed (attempt ${i+1}/${retries})`, e.message)
      if (i === retries - 1) {
        console.error('All retries failed, exiting.')
        process.exit(1)
      }
      const backoff = delayMs * Math.pow(2, i)
      console.log(`Waiting ${backoff}ms before next attempt...`)
      await new Promise(r => setTimeout(r, backoff))
    }
  }
}

connectWithRetry()

app.set('trust proxy', 1)

const path = require('path');

// Отдача статических файлов React
app.use(express.static(path.join(__dirname, 'build')));

// Для всех маршрутов, кроме API, отдаём index.html
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) return; // API обрабатываем отдельно
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("USING DB:", DB_URL)

app.use('/api/post', require('./routes/post.rout.js'))