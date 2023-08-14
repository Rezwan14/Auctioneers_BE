require('dotenv').config() //Loads environment variables from .env using the dotenv 

const SECRET = process.env.SECRET
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

module.exports = {
  MONGODB_URI,
  PORT,
  SECRET
}