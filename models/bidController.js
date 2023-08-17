const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bidModel = require("../models/bidModel");
const auctionModel = require("../models/item");
const { Types } = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createBid = async (req, res, next) => {
  const { auction_id } = req.params;
  const { coverLetter, msg, yourBidPrice, userId } = req.body;

  if (!ObjectId.isValid(auction_id))
    return next(new AppError("Kindly provide the valid auction Id", 400));

  // Check if the user has already bid on the auction
  console.log("req.user", req.user);
  const hasBid = await bidModel.exists({
    bid_owner_id: userId,
    auction_id: auction_id,
  });

  if (hasBid) {
    return next(
      new AppError("You have already placed a bid on this auction", 400)
    );
  }

  // Proceed to create the bid
  const makeBid = await bidModel.create({
    bid_owner_id: userId,
    auction_id,
    coverLetter,
    msg,
    yourBidPrice,
  });

  // Update the bidsOnAuction to include the user's ID
  await auctionModel.findByIdAndUpdate(
    { _id: auction_id },
    {
      $push: { users_id: userId },
    },
    { new: true } // Return the updated document
  );

  res.status(200).json({
    status: "Success",
    makeBid,
  });
};

// GET request to fetch auction details by ID
exports.getAllBidsByUserForAuction = async (req, res, next) => {
  const { auction_id } = req.params;

  if (!ObjectId.isValid(auction_id)) {
    return next(new AppError("Invalid auction ID", 400));
  }

  const auction = await bidModel.find({ auction_id: auction_id });

  if (!auction) {
    return next(new AppError("Auction not found", 404));
  }

  res.status(200).json({
    status: "Success",
    auction,
  });
};
