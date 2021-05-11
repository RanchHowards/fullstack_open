const logger = require('./logger')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Uknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message })
    }
    else if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({ error: err.message })
    }
    else next(err)
}
const tokenExtractor = (request, response, next) => {

    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
    }
    else { request.token = null }
    next()
}

const userExtractor = async (req, res, next) => {
    if (req.token !== null) {
        const decodedToken = jwt.verify(req.token, process.env.SECRET)
        const user = await User.findById(decodedToken.id)

        req.user = user
    }

    next()
}

module.exports = { unknownEndpoint, errorHandler, tokenExtractor, userExtractor }