const config = require('./utils/config')
const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const seed = require('./mongodb')
const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')



logger.info("Connecting to DB...")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => logger.info("Connected to Mongo DB"))
    .catch(err => logger.error("Could NOT connect to DATABASE"))

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

// seed.seed()

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

if (process.env.NODE_ENV === 'test') {
    const testingRouter = require('./controllers/testing')
    app.use('/api/testing', testingRouter)
}


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)



module.exports = app