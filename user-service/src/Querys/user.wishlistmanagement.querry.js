const { WishListItemModel } = require('../Models/user.wishlist.management.module')
const viewWishlist = async () => {
    try {
        return await WishListItemModel.find();
    } catch (error) {
        throw error;
    }
};
const findWishlistByUserName = async(userName)=>{
    try {
        return await WishListItemModel.find({email:userName});
    } catch (error) {
        throw error;
    }
}
const removeItemFromWishlist = async (itemId, session) => {
    try {
      const wishlistItem = await WishListItemModel.findByIdAndDelete(itemId).session(session);
      return wishlistItem;
    } catch (error) {
      throw error;
    }
  };
const findById = async (productId) => {
    try {
        const wishlistItem = await WishListItemModel.findById(productId);
        return wishlistItem;
    } catch (error) {
        throw error;
    }
};
const deleteItemById = async (productId) => {
    try {
        const deletedItem = await WishListItemModel.findByIdAndDelete(productId);
        return deletedItem;
    } catch (error) {
        throw error;
    }
};
const addToWishlist = async (wishlistData, session) => {
    try {
        const newProduct = new WishListItemModel(wishlistData);
        await newProduct.save(session);
        return newProduct;
    } catch (error) {
        throw error;
    }
};

const findProductInWishlist = async (productId, email) => {
    try {
      const existingProduct = await WishListItemModel.findOne({
        "productDetails._id": productId,
        email: email,
      });
      return existingProduct;
    } catch (error) {
      throw error;
    }
  };
module.exports = {
    viewWishlist,
    findWishlistByUserName,
    removeItemFromWishlist,
    findById,
    deleteItemById,
    addToWishlist,
    findProductInWishlist
}