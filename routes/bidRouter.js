const express = require("express");
const router = express.Router();
const {
  createBid,
  getAllBidsByUserForAuction,
} = require("../controller/bidController");
const { protect } = require("../controller/authController");

router.post("/create/:auction_id", protect, createBid);
router.get(
  "/specificAuctionByUser/:auction_id",
  protect,
  getAllBidsByUserForAuction
);

module.exports = router;
