const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const cors = require('cors');
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())
app.use(express.static('static'))

const PORT_ENV = process.env.PORT
const DB_URL = process.env.MONGODB_URL

const MongoDBConnectFunc = async () => {
    try {
        await mongoose.connect(DB_URL)
        app.listen(PORT_ENV, () => console.log(`Listen to -- http://localhost:${PORT_ENV}`))
        console.log("DB connected")
    } catch (error) {
        console.log("DB connected unsuccess")
    }
}

MongoDBConnectFunc()

app.use('/api/post', require('./routes/post.rout.js'))