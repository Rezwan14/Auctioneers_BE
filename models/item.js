const mongoose = require('mongoose')

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
    endDate:{
      type: Date,
      required: true,
    },
    
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item