const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const auctionModel = require("../model/auctionsModel");
const { Types } = require("mongoose");

exports.createAuction = catchAsync(async (req, res, next) => {
  const { name, description, startingBid, currentBid, endDate, winner } =
    req.body;

  if (!name || !startingBid || !endDate) {
    return next(
      new AppError("Kindly provide the complete data of the Auction", 400)
    );
  }

  const newAuctionItem = new auctionModel({
    auction_owner_id: req.user._id,
    name,
    description,
    startingBid,
    currentBid,
    endDate,
    winner,
  });

  try {
    const savedItem = await newAuctionItem.save();
    res.status(201).json({ status: "Success", savedItem });
  } catch (err) {
    return next(new AppError("Failed to create the auction item", 500));
  }
});
