const logger = require("./logger")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

//logs incoming request information
const requestLogger = (request, response, next) => { 
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

//handles unknown routes
const unknownEndpoint = (request, response) => { 
  response.status(404).send({ error: 'unknown endpoint' })
}

//handles various types of errors and responds accordingly
const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
      return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
      return response.status(401).json({
          error: 'invalid token'
      })
  } else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
          error: 'token expired'
      })
  }
  next(error)
}

//extracts JWT token from the request header
const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization")
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
      request.token = authorization.substring(7)
  }

  next()
}

//verifies the JWT token and attaches the user to the request if valid
const userExtractor = async (request, response, next) => {
  const token = request.token
  if (token) {
      const decodedToken = jwt.verify(token, process.env.SECRET)
      const user = await User.findById(decodedToken.id)
      request.user = user
  }

  next()
}
module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
}