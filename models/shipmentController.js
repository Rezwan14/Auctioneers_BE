const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Shipment = require("../models/shipmentModel"); // Replace with your shipment model

// Create a new shipment
exports.createShipment = catchAsync(async (req, res, next) => {
  const {
    shipmentTrackingNumber,
    yourName,
    yourPhoneNumber,
    yourEmail,
    shipmentCountry,
    shipmentCity,
    shipmentStreet,
    cashOnDelivery,
    userId,
    shipmentStatus,
  } = req.body;

  const newShipment = await Shipment.create({
    trackingNumber: shipmentTrackingNumber,
    name: yourName,
    phoneNumber: yourPhoneNumber,
    email: yourEmail,
    country: shipmentCountry,
    city: shipmentCity,
    street: shipmentStreet,
    cashOnDelivery,
    userId: userId,
    shipmentStatus: shipmentStatus,
  });

  res.status(201).json({
    status: "Success",
    shipment: newShipment,
  });
});

exports.getShipment = catchAsync(async (req, res, next) => {
  const { trackingNumber } = req.params;

  const shipment = await Shipment.find({ trackingNumber: trackingNumber });

  if (!shipment) {
    return next(new AppError("Shipment not found", 404));
  }

  res.status(200).json({
    status: "Success",
    shipment,
  });
});

exports.getShipmentAll = catchAsync(async (req, res, next) => {
  const shipment = await Shipment.find();
  if (!shipment) {
    return next(new AppError("Shipment not found", 404));
  }
  res.status(200).json({
    status: "Success",
    shipment,
  });
});
