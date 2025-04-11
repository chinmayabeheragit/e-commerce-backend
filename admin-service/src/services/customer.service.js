const customerQuery = require("../queries/customer.query");
const saveCustomer = async(body, session) => {
    try {
        return await customerQuery.createcustomer(body, session); 
    } catch (error) {
        throw error;
    }
};
const getallCustomer = async() => {
    try {
        const getcustom = await customerQuery.AllCustomer();
        return getcustom;
    } catch (error) {
        throw error;
    }
};
const getByidCustomer = async(customerId) => {
    try {
        const getcustomid = await customerQuery.findCustomerbyid(customerId);
        return getcustomid;
    } catch (error) {
        throw error;
    }
};
const getByCustomerName = async(customername) => {
    try {
        const getcustomname = await customerQuery.findCustomerByName(customername);
        return getcustomname;
    } catch (error) {
        throw error;
    }
};
const updateCustomer = async(customerId, body) => {
    try {
        const upcustom = await customerQuery.updateCustomerById(customerId, body);
        return upcustom;
    } catch (error) {
        throw error;
    }
};
const deleteCustomer = async(customerId) => {
    try {
        const deletecustom = await customerQuery.deleteCustomerById(customerId);
        return `${deletecustom} Product deleted successfully.`;
    } catch (error) {
        throw error;
    }
};
const PaginationAll = async(page, pageSize) => {
    try {
        const products = await customerQuery.CustomPagination(page, pageSize);
        return products;
    } catch (error) {
        throw error;
    }
};
module.exports = {
    PaginationAll,
    saveCustomer,
    getallCustomer,
    getByidCustomer,
    getByCustomerName,
    updateCustomer,
    deleteCustomer
}