const { AdminCustomer } = require("../models/customer.model");
const createcustomer = async (customerdata, session) => {
    try {
        const customer = await new AdminCustomer(customerdata);
        await customer.save(session);
        return customer;
    } catch (error) {
        throw error;
    }
}
const AllCustomer = async () => {
    try {
        const result = await AdminCustomer.find();
        return result;
    } catch (error) {
        throw error;
    }
};
const findCustomerByName = async (customername) => {
    try {
        const customer = await AdminCustomer.find({ customername });
        return customer;
    } catch (error) {
        throw error;
    }
};
const updateCustomerById = async (customerId, body) => {
    try {
        const { customername, phonenumber } = body
        const updatedCustomer = await AdminCustomer.findByIdAndUpdate(
            customerId, { $set: { customername, phonenumber } }, { new: true }
        );
        return updatedCustomer;
    } catch (error) {
        throw error;
    }

};
const deleteCustomerById = async (customerId) => {
    try {
        const filter = { _id: customerId, status: true };
        const deleteid = { $set: { status: false } };
        const deletedCustomer = await AdminCustomer.findByIdAndDelete(
            filter,
            deleteid, { new: true }
        );
        return deletedCustomer;
    } catch (error) {
        throw error;
    }
};
const findCustomerbyid = async (customerId) => {
    try {
        const custid = await AdminCustomer.findById({
            _id: customerId,
            status: true,
        })
        return custid;
    } catch (error) {
        throw error;
    }
};
const CustomPagination = async (page = 1, pageSize = 8) => {
    try {
        const pages = (page - 1) * pageSize;
        const pagi = await AdminCustomer.find().skip(pages).limit(pageSize);

        return pagi
    } catch (error) {
        throw error;
    }
}
module.exports = {
    CustomPagination,
    createcustomer,
    AllCustomer,
    findCustomerByName,
    deleteCustomerById,
    updateCustomerById,
    findCustomerbyid
}