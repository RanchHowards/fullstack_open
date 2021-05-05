const logger = require('./logger')

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Uknown endpoint' })
}

const errorHandler = (err, req, res, next) => {
    logger.error(err.message)

    if (err.name === 'CastError' && err.kind === 'ObjectId') {
        return res.status(400).send({ error: 'malformatted id' })
    }
    else if (err.name === 'ValidationError') {
        return res.status(400).send({ error: err.message })
    }
    else next(err)
}

module.exports = { unknownEndpoint, errorHandler }