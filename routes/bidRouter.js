const express = require("express");
const router = express.Router();
const {
  createBid,
  getAllBidsByUserForAuction,
} = require("../controllers/bidController");
const { protect } = require("../controllers/authController");

router.post("/create/:auction_id", createBid);
router.get("/specificAuctionByUser/:auction_id", getAllBidsByUserForAuction);

module.exports = router;
