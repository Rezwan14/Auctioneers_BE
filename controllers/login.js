const config = require("../utils/config")
const loginRouter = require("express").Router()
const User = require("../models/user")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })//find user

  //check user exists and password matches hashed pasword
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect)) {//return 401 response if incorrect
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {//create user object for JWT token
    username: user.username,
    id: user._id,
  }

  // token expires in 60*60 seconds, that is, in one hour
  const token = jwt.sign(userForToken,process.env.SECRET,{ expiresIn: 60*60 })
  response
    .status(200)
    .send({ token, username: user.username, firstName: user.firstName })
})

module.exports = loginRouter