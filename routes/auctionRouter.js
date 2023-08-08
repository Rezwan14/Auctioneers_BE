const express = require("express");
const router = express.Router();
const { createAuction } = require("../controller/auctionController");
const { protect } = require("../controller/authController");

router.post("/create", protect, createAuction);

module.exports = router;
