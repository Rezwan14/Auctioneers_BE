const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const auctionModel = require("../model/auctionsModel");
const ObjectId = require("mongoose").Types.ObjectId;

exports.createAuction = catchAsync(async (req, res, next) => {
  const { name, description, startingBid, currentBid, endDate, winner } =
    req.body;

  // Check if all required fields are present
  if (!name || !startingBid || !endDate) {
    return next(
      new AppError("Kindly provide the complete data of the Auction", 400)
    );
  }

  // Create a new auction item using the AuctionItem model
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
    // Save the auction item to the database
    const savedItem = await newAuctionItem.save();
    res.status(201).json({ status: "Success", savedItem });
  } catch (err) {
    return next(new AppError("Failed to create the auction item", 500));
  }
});

exports.getMyAuctions = catchAsync(async (req, res) => {
  const data = await auctionModel.find({
    auction_owner_id: ObjectId(req.user._id),
  });
  res.status(200).json({
    status: "success",
    data,
  });
});
