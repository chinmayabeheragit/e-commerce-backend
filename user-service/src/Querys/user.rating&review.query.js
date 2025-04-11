const { RatingReview } = require('../Models/user.rating&review.model');
const addRatingReview = async (body, session) => {
    try {
      const newRatingReview = new RatingReview(body);
      return await newRatingReview.save({ session });
    } catch (error) {
      throw error;
    }
  };
  
const getAllRatingReviews = async () => {
    try {
        return await RatingReview.find();
    } catch (error) {
        throw error;
    }
};
const getRatingReviewsById = async (productId) => {
    try {
      const reviews = await RatingReview.find({ productId }).exec();
      return reviews;
    } catch (error) {
      throw error;
    }
  };
const updateRatingReview = async (RatingReview_Id, data) => {
    try {
        const existingRatingReview = await RatingReview.findById(RatingReview_Id);
        const result = await RatingReview.findByIdAndUpdate(RatingReview_Id, data, { new: true });
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteRatingReview = async (RatingReview_Id) => {
    try {
        return await RatingReview.findByIdAndDelete(RatingReview_Id);
    } catch (error) {
        throw error;
    }
};
const countRatings = async(productId)=>{
    try {
        return await RatingReview.countDocuments({productId:productId});
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addRatingReview,
    getAllRatingReviews,
    getRatingReviewsById,
    updateRatingReview,
    deleteRatingReview,
    countRatings
};
