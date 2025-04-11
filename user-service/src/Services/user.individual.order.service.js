const IndividualQuery = require('../Querys/user.individualorder.query')

const getProductById = async (productId) => {
    try {
        const product = await IndividualQuery.getProductById(productId);
        return product;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    getProductById,
}