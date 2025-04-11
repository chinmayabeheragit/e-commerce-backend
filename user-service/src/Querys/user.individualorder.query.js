const { IndVisualItem } = require('../Models/user.indivisual.order.model');

const getProductById = async (productId) => {
    try {
        return await IndVisualItem.findById(productId);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getProductById,
}