const express = require("express");
const router = express.Router();
const { createBid } = require("../controller/bidController");
const { protect } = require("../controller/authController");

router.post("/create/:auction_id", protect, createBid);

module.exports = router;
