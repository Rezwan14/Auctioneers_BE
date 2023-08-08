const express = require("express");
const router = express.Router();
const {
  createAuction,
  getMyAuctions,
} = require("../controller/auctionController");
const { protect } = require("../controller/authController");

router.post("/create", protect, createAuction);
router.get("/my", protect, getMyAuctions);

module.exports = router;
