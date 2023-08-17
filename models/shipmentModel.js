const mongoose = require("mongoose");

const shipmentSchema = new mongoose.Schema({
  trackingNumber: {
    type: Number,
    required: false,
  },
  name: {
    type: String,
    required: false,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  country: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
  street: {
    type: String,
    required: false,
  },
  cashOnDelivery: {
    type: Boolean,
    default: false,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to your User model, change it to your actual User model name
    required: false,
  },
  shipmentStatus: {
    type: String,
    required: false,
  },
});

const Shipment = mongoose.model("Shipment", shipmentSchema);

module.exports = Shipment;
