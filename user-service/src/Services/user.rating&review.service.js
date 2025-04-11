const RatingReviewQuery = require('../Querys/user.rating&review.query');
const authQuery = require("../Querys/user.auth.Query");
const ProductQuery = require('../Querys/vendor.product.query')
const customException = require('../../commons/exception/customException')
const statusCode = require('../../commons/utils/statusCode')

const addRatingReview = async (productId, body, userName, session) => {
  try {
    body.email = userName;
    body.productId = productId;

    const user = await authQuery.findByEmail(userName);
    if (!user) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "User not found.",
        "The user does not exist or the provided email is incorrect."
      );
    }

    body.name = user.name;

    // Add rating and review
    const result = await RatingReviewQuery.addRatingReview(body, session);
    if (!result) {
      throw customException.error(
        statusCode.SERVER_ERROR,
        "Failed to add rating and review.",
        "There was an issue adding the rating and review. Please try again."
      );
    }

    // Update the product with the new rating and review
    const product = await ProductQuery.findById(productId).session(session);
    if (!product) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Product not found.",
        "The product with the given ID does not exist."
      );
    }

    product.ratingsReviews.push(result._id);
    await product.save({ session });

    return result;
  } catch (error) {
    throw error;
  }
};

  
  
const getAllRatingReviews = async () => {
    try {
        const RatingReview = await RatingReviewQuery.getAllRatingReviews();
        return RatingReview;
    } catch (error) {
        throw error
    }
}
const updateRatingReview = async (RatingReview_Id, data, session) => {
    try {
        const updatedRatingReview = await RatingReviewQuery.updateRatingReview(
            RatingReview_Id,
            data,
            session
        );
        return updatedRatingReview;
    } catch (error) {
        throw error;
    }
};
const getRatingReviewsById = async (productId) => {
  try {
    const reviews = await RatingReviewQuery.getRatingReviewsById(productId);
    if (reviews.length <= 0) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Rating and review not found.",
        `Rating and review with ID ${productId} does not exist.`
      );
    }
    return reviews;
  } catch (error) {
    throw error;
  }
};


const deleteRatingReviews = async (RatingReviews_id) => {
    try {
      const result = await RatingReviewQuery.deleteRatingReview(RatingReviews_id);
      if (!result) {
        throw customException.error(
          statusCode.NOT_FOUND,
          "Rating and review not found.",
          `Rating and review with ID ${RatingReviews_id} does not exist.`
        );
      }
      return result;
    } catch (error) {
      throw error;
    }
  };
  
const viewAvgRatingOfProd = async(productId)=>{
    try {
        let rating = 0;
        const ratings = await RatingReviewQuery.getRatingReviewsById(productId);
        const countRatings = await RatingReviewQuery.countRatings(productId);
        ratings.forEach(element => {
            rating+=element.rating;
        });
        return {avgRating: rating/countRatings};
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addRatingReview,
    getAllRatingReviews,
    updateRatingReview,
    getRatingReviewsById,
    deleteRatingReviews,
    viewAvgRatingOfProd
}