const config = require ('../utils/config')
const express = require('express')
const Item = require('../models/item')
const itemsRouter = express.Router()

itemsRouter.get('/', (request, response) => {
  Item
    .find({})
    .then(items => {
      response.json(items)
    })
})

itemsRouter.post('/', (request, response) => {
  const item = new Item(request.body)

  item
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})

module.exports = itemsRouter