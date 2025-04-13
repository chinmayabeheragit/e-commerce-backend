const { isValidObjectId } = require("mongoose");
const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const withdrawalQuery = require("../queries/vendor.withdrawal.query");
const checkBody = async(body)=>{
  try {
      if(Object.keys(body).length === 0){
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
}
const saveAccount = async (vendorName, body, session) => {
  try {
    await checkBody(body);
    body.vendorName = vendorName;
    const existAccount = await withdrawalQuery.findByAccNumber(body.accountNumber);
    if(existAccount.length > 0){
      throw customException.error(
        statusCode.CONFLICT,
        "Account already exist.",
        "Account already exist."
      );
    }
    return await withdrawalQuery.saveAccount(body, session);
  } catch (error) {
    throw error;
  }
};
const upAccount = async (id, body, vendorName) => {
  try {
    await checkBody(body);
    if (!isValidObjectId(id)) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid account ID",
        "Invalid account ID"
      );
    }
    const account = await withdrawalQuery.findAccById(id);
    if (!account) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Account not found.",
        "No account exists with the given ID"
      );
    }
    if (account.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to update the account does not own it."
      );
    }
    const existAccount = await withdrawalQuery.findByAccNumber(body.accountNumber);
    if(existAccount.length > 0){
      throw customException.error(
        statusCode.CONFLICT,
        "Account already exist.",
        "Account already exist."
      );
    }
    const updatedAccount = await withdrawalQuery.upAccount(id, body);
    return updatedAccount;
  } catch (error) {
    throw error;
  }
};
const delAccount = async (id, vendorName) => {
  try {
    if (!isValidObjectId(id)) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid account ID",
        "Invalid account ID"
      );
    }
    const account = await withdrawalQuery.findAccById(id);
    if (!account) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Account not found.",
        "No account exists with the given ID"
      );
    }
    if (account.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to delete the account does not own it."
      );
    }
    const deltedAccount = await withdrawalQuery.delAccount(id);
    return deltedAccount;
  } catch (error) {
    throw error;
  }
};
const viewAll = async (page, pageSize, vendorName) => {
  try {
    const accounts = await withdrawalQuery.viewAll(page, pageSize, vendorName);
    return accounts;
  } catch (error) {
    throw error;
  }
};
const viewByVen = async (vendorName) => {
  try {
    return await withdrawalQuery.viewByVen(vendorName);
  } catch (error) {
    throw error;
  }
};
const viewAccount = async (id, vendorName) => {
  try {
    if (!isValidObjectId(id)) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid account ID",
        "Invalid account ID"
      );
    }
    const account = await withdrawalQuery.findAccById(id);
    if (!account) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Account not found.",
        "No account exists with the given ID"
      );
    }
    if (account.vendorName !== vendorName) {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Vendor mismatch.",
        "The vendor trying to see the account does not own it."
      );
    }
    return account;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  saveAccount,
  upAccount,
  delAccount,
  viewAll,
  viewByVen,
  viewAccount,
};
