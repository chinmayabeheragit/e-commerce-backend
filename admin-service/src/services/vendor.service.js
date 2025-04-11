const { isValidObjectId } = require("mongoose");
const customException = require("../../commons/exception/customException");
const statusCode = require("../../commons/utils/statusCode");
const vendorQuery = require("../queries/vendor.query");
const emailSendor = require("./sendingmail");
const generatePassword = require("generate-password");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const checkBody = async (body) => {
  try {
    if (Object.keys(body).length === 0) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Request body is empty.",
        "The request body cannot be empty."
      );
    }
    return body;
  } catch (error) {
    throw error;
  }
};

// const addVendor = async (body, session) => {
//   try {
//     await emailSendor.sendWelcomeEmail(body.Email, body.Name);
//     return await vendorQuery.addVendor(body, session);
//   } catch (error) {
//     throw error;
//   }
// };
const addVendor = async (body, session) => {
  try {
    await checkBody(body);
    const {
      name,
      number,
      storeName,
      warehouseAddress,
      bankAccountDetails: { accountNumber, IFSCCode, bankName },
      aadhar,
      businessPanNumber,
      GSTIN,
      email,
    } = body;

    const vendorDetailsData = {
      name: name,
      number: number,
      storeName: storeName,
      warehouseAddress: warehouseAddress,
      bankAccountDetails: {
        accountNumber: accountNumber,
        IFSCCode: IFSCCode,
        bankName: bankName,
      },
      aadhar: aadhar,
      businessPanNumber: businessPanNumber,
      GSTIN: GSTIN,
      email: email,
    };
    const saveVendorDetails = await vendorQuery.saveVendorDetails(
      vendorDetailsData,
      session
    ); 
    const id = saveVendorDetails._id.toString();
    await vendorApproved({id});
    return saveVendorDetails;
  } catch (error) {  
    throw error;
  }
};
const listVendors = async () => {
  try {
    const vendors = await vendorQuery.listVendors();
    if (!vendors || vendors.length === 0) {
      return "No vendors found.";
    }
    return vendors;
  } catch (error) {
    throw error;
  }
};

const viewInactiveVendor = async () => {
  try {
    return await vendorQuery.viewInactiveVendor();
  } catch (error) {
    throw error;
  }
};

const editVendor = async (vendorId, updatedData, session) => {
  try {
    const result = await vendorQuery.editVendor(vendorId, updatedData, session);
    return result;
  } catch (error) {
    throw error;
  }
};

const deleteVendor = async (vendorId) => {
  try {
    const result = await vendorQuery.deleteVendor(vendorId);
    return result;
  } catch (error) {
    throw error;
  }
};

const getReqVendor = async () => {
  try {
    const reqVendorDetails = await vendorQuery.getReqVendor();
    if (!reqVendorDetails) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "No Requested Vendors Found",
        "No vendors have been requested or found with the given criteria. Please check the query or criteria."
      );
    }
    return reqVendorDetails;
  } catch (error) {
    throw error;
  }
};

const generateVendorId = () => {
  const prefix = "kidz";
  const randomNumber = crypto.randomInt(10000, 99999);
  return `${prefix}${randomNumber}`;
};
const vendorApproved = async (body) => {
  try {
    const { id } = body;
    if (!id) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Missing Vendor ID",
        "The request is missing the vendor ID. Please provide a valid ID in the request body."
      );
    }
    if (!isValidObjectId(id)) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid account ID",
        "Invalid account ID"
      );
    }
    const vendorDetails = await vendorQuery.findVendorById(id);
    if (!vendorDetails) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Vendor Not Found",
        "No vendor found with the provided ID. Please verify the ID and try again."
      );
    }
    const { email, name } = vendorDetails;
    const vendorId = generateVendorId();
    const password = generatePassword.generate({
      length: 10,
      numbers: true,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const updatedVendor = await vendorQuery.updateVendor(id, {
      email,
      vendorId,
      password: hashedPassword,
    });
    await emailSendor.sendWelcomeEmailToVendor(email, name, vendorId, password);
    return updatedVendor;
  } catch (error) {
    throw error;
  }
};
const makeVendorInactive = async (body) => {
  try {
    const { id } = body;
    if (!isValidObjectId(id)) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid account ID",
        "Invalid account ID"
      );
    }
    const vendorDetails = await vendorQuery.findVendorById(id);
    if (!vendorDetails) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Vendor Not Found",
        "No vendor found with the provided ID. Please verify the ID and try again."
      );
    }
    const updatedVendor = await vendorQuery.makeVendorInactive(id);
    return updatedVendor;
  } catch (error) {
    throw error;
  }
};
const makeVendorActive = async (body) => {
  try {
    const { id } = body;
    if (!isValidObjectId(id)) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid account ID",
        "Invalid account ID"
      );
    }
    const vendorDetails = await vendorQuery.findVendorById(id);
    if (!vendorDetails) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Vendor Not Found",
        "No vendor found with the provided ID. Please verify the ID and try again."
      );
    }
    if (!vendorDetails.login.password) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor account is not active. Please approve the vendor before proceeding.",
        "The vendor's account is not yet approved. Please ensure the vendor is approved and try again."
      );
    }
    const updatedVendor = await vendorQuery.makeVendorActive(id);
    return updatedVendor;
  } catch (error) {
    throw error;
  }
};
const viewVendorByStatus = async (status) => {
  try {
    if (status !== "active" && status !== "inactive" && status !== "all") {
      throw customException.error(
        statusCode.BAD_REQUEST,
        `Invalid status ${status}.`,
        `The status ${status} is invalid. Only "active", "inactive" and "all" statuses are allowed. Please verify the status and try again.`
      );
    }
    if(status === 'all'){
      const vendors = await vendorQuery.viewAllVendors();
      return vendors;
    }
    const vendors = await vendorQuery.viewVendorByStatus(status);
    if (vendors.length <= 0) {
      throw customException.error(
        statusCode.NOT_FOUND,
        `${status} vendors not found.`,
        `No vendors with the status "${status}" were found. Please verify the status and try again.`
      );
    }
    return vendors;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addVendor,
  listVendors,
  viewInactiveVendor,
  editVendor,
  deleteVendor,
  getReqVendor,
  vendorApproved,
  makeVendorInactive,
  makeVendorActive,
  viewVendorByStatus,
};
