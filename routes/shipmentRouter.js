const express = require("express");
const router = express.Router();
const {
  createShipment,
  getShipment,
  getShipmentAll,
  updateShipment,
  deleteShipment,
} = require("../controllers/shipmentController");

router.post("/create", createShipment);

router.get("/get/:trackingNumber", getShipment);
router.get("/getall", getShipmentAll);

module.exports = router;
