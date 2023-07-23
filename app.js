const config = require("./utils/config")
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger")
const middleware = require("./utils/middleware")
const mongoose = require("mongoose")
const itemsRouter = require('./controllers/item')


const url = config.MONGODB_URI
logger.info("connecting to MongoDB")

mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB")
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/items', itemsRouter)




app.use(middleware.unknownEndpoint)
module.exports = app