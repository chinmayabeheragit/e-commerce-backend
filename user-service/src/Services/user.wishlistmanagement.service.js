const WishListManagementQuery = require("../Querys/user.wishlistmanagement.querry");
const CartManagementQuery = require("../Querys/user.cartmanagement.query");
const productQuery = require("../Querys/vendor.product.query");
const customException = require("../../commons/exception/customException")
const statusCode = require("../../commons/utils/statusCode")
const moveItemToCart = async (productId, email, session) => {
  try {
    const productDetails = await productQuery.findProd(productId);
    const alreadyExist = await CartManagementQuery.findProdExist(
      productId,
      email
    );
    if (alreadyExist) {
      return alreadyExist;
    }
    return await CartManagementQuery.createCartItem(
      { productDetails, email },
      session
    );
  } catch (error) {
    throw error;
  }
};
const viewWishlistByUserName = async (userName) => {
  try {
    return await WishListManagementQuery.findWishlistByUserName(userName);
  } catch (error) {
    throw error;
  }
};
const removeItemFromWishlist = async (itemId, session) => {
  try {
    const wishlistItem = await WishListManagementQuery.removeItemFromWishlist(itemId, session);
    return wishlistItem;
  } catch (error) {
    throw error;
  }
};
const addToWishlist = async (productId, email, session) => {
  try {
    // Check if the product is already in the wishlist
    const existingProduct = await WishListManagementQuery.findProductInWishlist(productId, email);

    if (existingProduct) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Product already in wishlist.",
        "The product is already in the user's wishlist."
      );
    }

    const productDetails = await productQuery.getProductById(productId);
    if (!productDetails) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Product not found.",
        "The product does not exist or the provided product ID is incorrect."
      );
    }

    const result = await WishListManagementQuery.addToWishlist(
      { productDetails, email },
      session
    );
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  moveItemToCart,
  viewWishlistByUserName,
  removeItemFromWishlist,
  addToWishlist,
};
