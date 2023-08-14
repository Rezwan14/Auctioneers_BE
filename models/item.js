const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

//item name, category, description, starting bid, time, start date, end date
const itemSchema = new mongoose.Schema({
    itemName:{
      type: String,
      required: true,
    },
    category:{
      type: String,
      required: true,
    },
    description:{
      type: String,
      required: true,
    },
    startingBid:{
      type: Number,
      default: 0,
    },
    startTime:{
      type:String,
      require: true,
    },
    startDate:{
      type: Date,
      required: true,
    },
    participants:{
      type: Number,
      default: 0,
    },
    listParticipants:[{
      type: String
    }],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    
})

//Transforms the schema output and adds validation using
itemSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

itemSchema.plugin(uniqueValidator)
const Item = mongoose.model('Item', itemSchema)
module.exports = Item