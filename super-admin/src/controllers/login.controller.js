const StatusCode = require("../../../common-libs/utils/statusCode");
const response = require("../../../common-libs/response/response");
const loginService = require("../services/service");
const mongoose = require("mongoose");
const addAdmin = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await loginService.addAdmin(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const addVendor = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const result = await loginService.addVendor(req.body, session);
    await session.commitTransaction();
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    await session.abortTransaction();
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  } finally {
    session.endSession();
  }
};
const login = async (req, res) => {
  try {
    const result = await loginService.login(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res
    );
  } catch (error) {
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error"},
      res,
      error
    );
  }
};
module.exports = {
  addAdmin,
  /**
   * @swagger
   * tags:
   *   name: Vendor services
   *   description: Vendor service APIs
   *
   * /add-vendor:
   *   post:
   *     summary: Add a new vendor
   *     description: Use this API to add a new vendor
   *     tags:
   *       - Vendor Services
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: vendor
   *         description: The vendor object to add
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             name:
   *               type: string
   *               description: The name of the vendor
   *               example: Your Name
   *             email:
   *               type: string
   *               format: email
   *               description: The email address of the vendor
   *               example: Your Gmail
   *             password:
   *               type: string
   *               description: The password of the vendor
   *               example: password
   *     responses:
   *       200:
   *         description: Successful response indicating the addition of the vendor
   *       400:
   *         description: Bad Request
   *       500:
   *         description: Internal server error
   */
  addVendor,
  /**
   * @swagger
   * tags:
   *   name: Authentication
   *   description: User authentication APIs
   *
   * /login:
   *   post:
   *     summary: User login
   *     description: Use this API to authenticate a user
   *     tags:
   *       - Authentication
   *     produces:
   *       - application/json
   *     consumes:
   *       - application/json
   *     parameters:
   *       - in: body
   *         name: credentials
   *         description: The user credentials for login
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             username:
   *               type: string
   *               format: email
   *               description: The username or email address of the user
   *               example: Your Gmail
   *             password:
   *               type: string
   *               description: The password of the user
   *               example: password
   *     responses:
   *       200:
   *         description: Successful response indicating successful login
   *       401:
   *         description: Unauthorized - Invalid credentials
   *       500:
   *         description: Internal server error
   */
  login,
};
