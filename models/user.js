const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 3,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  firstName: String,
  lastName: String,
  creditCard: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'CreditCard'
  }, 
  userProfile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userProfile'
  },
  items: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
    },
  ],

  email: String,
  birthday: Date,
  country: String,
});

//Transforms the schema output and adds validation
userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

userSchema.plugin(uniqueValidator)
const User = mongoose.model('User', userSchema);

module.exports = User;
