const config = require("./utils/config") //config
const express = require("express")
require("express-async-errors")
const app = express()
const cors = require("cors")
const logger = require("./utils/logger") //logger
const middleware = require("./utils/middleware") //middleware
const mongoose = require("mongoose") //mongoDB
const itemsRouter = require('./controllers/item') //router for items
const usersRouter = require("./controllers/user") //router for users
const loginRouter = require("./controllers/login") //router for login
const url = config.MONGODB_URI

logger.info("connecting to MongoDB")//log mongoDB connection attemp

//connec to mongoDB
mongoose
  .connect(url)
  .then(() => {
    logger.info("connected to MongoDB")
  })


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger) //log incoming routes
app.use(middleware.tokenExtractor) //extract token from request

//route handling
app.use('/api/items', middleware.userExtractor, itemsRouter)
app.use("/api/users", usersRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
module.exports = app
