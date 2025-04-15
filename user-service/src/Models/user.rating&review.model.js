const mongoose = require("mongoose");
const shortId = require("shortid");

const ratingReviewSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PROD-RATINGREVIEW-ENQ-${shortId.generate()}`,
  },
  name: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    enum: [1, 2, 3, 4, 5],
  },
  review: {
    type: String,
    required: true,
  },
  productImage: {
    type: [String],
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
  },
});

const RatingReview = mongoose.model("RatingReview", ratingReviewSchema);
module.exports = { RatingReview };
