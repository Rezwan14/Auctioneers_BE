const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    bid_owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Every Bid must have Owner"],
    },
    auction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auctions",
      type: String,
      required: [true, "Please provide the Id of Auction"],
    },
    coverLetter: {
      type: String,
      require: [true, "Please provide the cover letter for bid"],
    },
    msg: {
      type: String,
    },
    yourBidPrice: {
      type: String,
      required: [true, "Please provide the your Price of bid"],
    },
  },
  {
    timestamps: true,
  }
);
const Bids = mongoose.model("Bids", bidSchema);
module.exports = Bids;
