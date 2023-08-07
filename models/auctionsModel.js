const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    auction_owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Every Auction must have Owner"],
    },
    name: {
      type: String,
      required: [true, "Please provide the name of Auction"],
    },
    description: {
      type: String,
    },
    startingBid: {
      type: String,
      required: [true, "Please provide the startingBid of Auction"],
    },
    currentBid: {
      type: String,
      default: 0,
    },
    endDate: {
      type: Date,
      required: [true, "Please provide the endDate of Auction"],
    },
    users_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    winner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }, // Reference to the winning bidder
  },
  {
    timestamps: true,
  }
);
const Auctions = mongoose.model("Auctions", auctionSchema);
module.exports = Auctions;
