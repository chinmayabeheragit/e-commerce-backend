const CartManagementQuery = require('../Querys/user.cartmanagement.query')
const productQuery = require("../Querys/vendor.product.query")
const statusCode = require("../../commons/utils/statusCode")
const customException = require("../../commons/exception/customException");

const viewProducts = async (email) => {
  try {
    const product = await CartManagementQuery.viewProducts(email);
    return product;
  } catch (error) {
    throw error;
  }
};

const calculateTotalPrice = async () => {
    try {
        const cartItems = await CartManagementQuery.getAllPriceOfCartItems();
        const totalPrice = cartItems.reduce((total, item) => {
            return total + item.totalPrice;
        }, 0);
        return totalPrice;
    } catch (error) {
        throw error
    }
}

const addToCart = async (productIds, email, session) => {
  try {
    let cartItem = await CartManagementQuery.findCartByEmail(email, session);
    if (!cartItem) {
      cartItem = await CartManagementQuery.createCartItem({
        email,
        products: [],
      }, session);
    }
        if (!Array.isArray(cartItem.products)) {
      cartItem.products = [];
    }

    for (const productId of productIds) {
      const productDetails = await productQuery.getProductById(productId);
      if (productDetails) {
        const existingProduct = cartItem.products.find(item => item.productDetails._id.toString() === productDetails._id.toString());
        if (!existingProduct) {
          cartItem.products.push({ productDetails });
        }
      } else {
      }
    }

    await cartItem.save({ session });

    return {
      result: {
        _id: cartItem._id,
        products: cartItem.products,
        email: cartItem.email,
        createdAt: cartItem.createdAt,
        updatedAt: cartItem.updatedAt,
      },
    };
  } catch (error) {
    throw error;
  }
};


const removeCartProduct = async (cartId, productIds, userEmail) => {
  try {
    // Validate that userEmail is provided
    if (!userEmail) {
      throw customException.error(
        statusCode.UN_AUTHORIZED,
        "User not authenticated.",
        "No email found in the request, please authenticate."
      );
    }

    // Fetch the cart details using the cartId and userEmail
    const cartDetails = await CartManagementQuery.findCartByCartIdAndEmail(cartId, userEmail);
    if (!cartDetails) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Cart not found.",
        "The cart does not exist or the provided cart ID is incorrect."
      );
    }

    // Filter out products to remove
    const updatedProducts = cartDetails.products.filter(
      product => !productIds.includes(product.productDetails._id.toString())
    );

    if (updatedProducts.length === cartDetails.products.length) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Cart items not found.",
        "None of the products are in the user's cart."
      );
    }

    // Update cart with the remaining products
    cartDetails.products = updatedProducts;
    const updatedCart = await cartDetails.save();

    return updatedCart;
  } catch (error) {
    throw error;
  }
};





  

module.exports = {
    viewProducts,
    calculateTotalPrice,
    addToCart,
    removeCartProduct
}