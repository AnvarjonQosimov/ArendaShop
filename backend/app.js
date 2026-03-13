const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(cors({
  origin: "https://arendashop.uz"
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())
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

const connectWithRetry = async (retries = 5, delayMs = 5000) => {
  for (let i = 0; i < retries; i++) {
    try {
      await mongoose.connect(DB_URL, {
        serverSelectionTimeoutMS: 4000
      })
      console.log('DB connected')
      app.listen(PORT_ENV, () => console.log(`Listen to -- http://localhost:${PORT_ENV}`))
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

console.log("USING DB:", DB_URL)

app.use('/api/post', require('./routes/post.rout.js'))