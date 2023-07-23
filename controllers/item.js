const jwt = require('jsonwebtoken')
const config = require ('../utils/config')
const express = require('express')
const Item = require('../models/item')
const itemsRouter = express.Router()

itemsRouter.get('/', async (request, response) => {
  const items = await Item
    .find({})
    .populate("user", {username: 1, fistName: 1, lastName: 1})
  response.json(items)
})

itemsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET)
  if (!decodedToken.id) {
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const user = request.user
  const item = await new Item({
    itemName: body.itemName,
    category: body.category,
    description: body.description,
    startingBid: body.startingBid,
    startTime: body.startTime,
    startDate: body.startDate,
    endDate: body.endDate,
    user: user._id
  }).populate("user", {username: 1, firstName: 1, lastName: 1})

  const save = await item.save()
  user.items = user.items.concat(save._id)
  await user.save()
  
  response
  .status(201)
  .json(save.toJSON())
})

module.exports = itemsRouter