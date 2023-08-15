const mongoose = require('mongoose');

const creditCardSchema = new mongoose.Schema({
  cardNumber: String,
  nameOnCard: String,
  expiryDate: String,
  cvv: String,
  balance: Number,
});

module.exports = mongoose.model('CreditCard', creditCardSchema);