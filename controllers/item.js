const jwt = require('jsonwebtoken')
const config = require ('../utils/config')
const express = require('express')
const Item = require('../models/item')
const itemsRouter = express.Router()

itemsRouter.get('/', async (request, response) => {//retreive all items
  const items = await Item
    .find({})
    .populate("user", {username: 1, fistName: 1, lastName: 1})
  response.json(items)
})


//user login by comparing credentials and generating a JWT token
itemsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, config.SECRET) //verify and decode JWT token 
  if (!decodedToken.id) {//check if contains valid user iD
    return response
      .status(401)
      .json({ error: 'Token missing or invalid' })
  }

  const user = request.user
  const item = await new Item({//create new item
    itemName: body.itemName,
    category: body.category,
    description: body.description,
    startingBid: body.startingBid,
    startTime: body.startTime,
    startDate: body.startDate,
    participants: body.participants,
    listParticipants: body.listParticipants,
    user: user._id
  }).populate("user", {username: 1, firstName: 1, lastName: 1})

  const save = await item.save()
  user.items = user.items.concat(save._id)
  await user.save()
  
  response
  .status(201)
  .json(save.toJSON())
})

//update items 
itemsRouter.put('/:id', async (request, responds) => {
  const id = request.params.id
  const body = request.body

  const updatedItem = {
    itemName: body.itemName,
    category: body.category,
    description: body.description,
    startingBid: body. startingBid,
    startTime: body.startTime,
    startDate: body.startDate,
    participants: body.partipants,
    listParticipants: body.listParticipants
  }

  const result = await Item
    .findByIdAndUpdate(id, updatedItem, {new: true})//find and update item

  if (result){
    express.response.json(result)
  }else{
    response
      .status(404)
      .end()
  }
  
})


module.exports = itemsRouter