const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')



logger.info("Connecting to DB...")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => logger.info("Connected to Mongo DB"))
    .catch(err => logger.error("Could NOT connect to DATABASE"))

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app