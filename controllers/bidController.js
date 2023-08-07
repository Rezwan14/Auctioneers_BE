const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bidModel = require("../model/bidModel");
const auctionModel = require("../model/auctionsModel");
const { Types } = require("mongoose");
const ObjectId = require('mongoose').Types.ObjectId;

exports.createBid = catchAsync(async (req, res, next) => {
  const { auction_id } = req.params;
  const { coverLetter, msg, yourBidPrice } = req.body;

  if (!ObjectId.isValid(auction_id))
    return next(new AppError("Kindly provide the valid auction Id", 400));

  // Check if the user has already bid on the auction
  const hasBid = await bidModel.exists({
    bid_owner_id: req.user._id,
    auction_id: auction_id,
  });

  if (hasBid) {
    return next(new AppError("You have already placed a bid on this auction", 400));
  }

  // Proceed to create the bid
  const makeBid = await bidModel.create({
    bid_owner_id: req.user._id,
    auction_id,
    coverLetter,
    msg,
    yourBidPrice,
  });

  // Update the bidsOnAuction to include the user's ID
  await auctionModel.findByIdAndUpdate(
  { _id: auction_id},
    {
      $push: { users_id: req.user._id },
    },
    { new: true } // Return the updated document
  );

  res.status(200).json({
    status: "Success",
    makeBid,
  });
});

