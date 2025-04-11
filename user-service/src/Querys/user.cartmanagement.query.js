const { CartItemModel } = require("../Models/user.cart.management.model");
const { productManagementModel } = require("../Models/productManagement.model");
const viewProducts = async (email) => {
  try {
    return await CartItemModel.findOne({ email }).populate('products.productDetails');
  } catch (error) {
    throw error;
  }
};

const getAllPriceOfCartItems = async () => {
  try {
    return await CartItemModel.find({});
  } catch (error) {
    throw error;
  }
};
const createCartItem = async (productData, session) => {
  try {
    const cartItem = new CartItemModel(productData);
    await cartItem.save({ session });
    return cartItem;
  } catch (error) {
    throw error;
  }
};

const findOneCartItem = async (productId, userId) => {
  try {
    return await CartItemModel.findOne({ productId, user: userId });
  } catch (error) {
    throw error;
  }
};
const findOneProductById = async (productId) => {
  try {
    const product = await productManagementModel.findOne({ _id: productId });
    return product;
  } catch (error) {
    throw error;
  }
};

const removeCartProduct = async (id) => {
  try {
    return await CartItemModel.findByIdAndDelete(id);
  } catch (error) {
    throw error;
  }
};
const findProdExist = async (id, email) => {
  try {
    const product = await CartItemModel.findOne({_id:id,email:email });
    return product;
  } catch (error) {
    throw error;
  }
};
const findCartByCartId = async (cartId) => {
  try {
    const cart = await CartItemModel.findById(cartId);
    return cart;
  } catch (error) {
    throw error;
  }
};


const getCartItemById = async (cartId, session) => {
  try {
    const cart = await CartItemModel.findById(cartId).session(session);
    if (cart && Array.isArray(cart.products)) {
      return cart;
    } else {
      throw new Error("Cart is empty or not found");
    }
  } catch (error) {
    throw error;
  }
};

const getCartById = async (cartId, session) => {
  try {
      const cart = await CartItemModel.findById(cartId).session(session);
      return cart;
  } catch (error) {
      throw error;
  }
};
const findCartByEmail = async (email, session) => {
  try {
    return await CartItemModel.findOne({ email }).session(session);
  } catch (error) {
    throw error;
  }
};
const findCartByCartIdAndEmail = async (cartId, email) => {
  try {
    const cart = await CartItemModel.findOne({ _id: cartId, email });
    return cart;
  } catch (error) {
    throw error;
  }
};
const getCartByUserEmail = async (userEmail, session) => {
  try {
    return await CartItemModel.findOne({ email: userEmail }).session(session);
  } catch (error) {
    throw error;
  }
};

module.exports = {
  viewProducts,
  getAllPriceOfCartItems,
  createCartItem,
  findOneCartItem,
  findOneProductById,
  removeCartProduct,
  findProdExist,
  findCartByCartId,
  getCartItemById,
  getCartById,
  findCartByEmail,
  findCartByCartIdAndEmail,
  getCartByUserEmail
};
