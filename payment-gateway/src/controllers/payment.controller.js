const StatusCode = require("../../commons/utils/statusCode");
const response = require("../../commons/response/response");
const paymentService = require("../services/payment.service");
const createCheckOutSession = async (req, res) => {
  try {
    const result = await paymentService.createCheckOutSession(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "checkout session creation successfully.",
      "checkout session creation successfully."
    );
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorCode) {
      const errorCode = error.response.data.errorCode;
      const errorMessage = error.response.data.message;
      switch (errorCode) {
        case 'invalid_body_format':
          return response.handleErrorResponse({errorCode:StatusCode.BAD_REQUEST, message: errorMessage}, res);
        default:
          return response.handleErrorResponse({errorCode:StatusCode.SERVER_ERROR, message: "Internal Server Error" }, res);
      }
    }
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
  }
};
const operationInquiry = async(req, res)=>{
  try {
    const result = await paymentService.operationInquiry(req.body);
    return response.handleSuccessResponse(
      { successCode: StatusCode.SUCCESS_CODE, result },
      res,
      "Operation details retrieved, including status, payment gateway, method, and shopper info.",
      "Operation details retrieved, including status, payment gateway, method, and shopper info."
    );
  } catch (error) {
    if (error.response && error.response.data && error.response.data.errorCode) {
      const errorCode = error.response.data.errorCode;
      const errorMessage = error.response.data.message;
      switch (errorCode) {
        case 'invalid_body_format':
          return response.handleErrorResponse({ errorCode: StatusCode.BAD_REQUEST, message: errorMessage }, res);
        case 'invalid_body_fields':
          return response.handleErrorResponse({ errorCode: StatusCode.BAD_REQUEST, message: errorMessage }, res);
        default:
          return response.handleErrorResponse({ errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" }, res);
      }
    }
    if (error.errorCode) {
      return response.handleErrorResponse(error, res);
    }
    return response.handleErrorResponse(
      { errorCode: StatusCode.SERVER_ERROR, message: "Internal Server Error" },
      res
    );
}}
module.exports = {
  /**
   * @swagger
   * /create-check-out-session:
   *   post:
   *     summary: Create a checkout session
   *     description: |
   *       This endpoint generates a checkout session representing payment and shopper information that is available on the Checkout page.
   *       - `countryCode` should be an ISO 3166-1 alpha-2 country code. Allowed values: AD, AE, AF, AG, AI, AL, AM, AO, AQ, AR, AS, AT, AU, AW, AX, AZ, BA, BB, BD, BE, BF, BG, BH, BI, BJ, BL, BM, BN, BO, BQ, BR, BS, BT, BV, BW, BY, BZ, CA, CC, CD, CF, CG, CH, CI, CK, CL, CM, CN, CO, CR, CU, CV, CW, CX, CY, CZ, DE, DJ, DK, DM, DO, DZ, EC, EE, EG, EH, ER, ES, ET, FI, FJ, FK, FM, FO, FR, GA, GB, GD, GE, GF, GG, GH, GI, GL, GM, GN, GP, GQ, GR, GS, GT, GU, GW, GY, HK, HM, HN, HR, HT, HU, ID, IE, IL, IM, IN, IO, IQ, IR, IS, IT, JE, JM, JO, JP, KE, KG, KH, KI, KM, KN, KP, KR, KW, KY, KZ, LA, LB, LC, LI, LK, LR, LS, LT, LU, LV, LY, MA, MC, MD, ME, MF, MG, MH, MK, ML, MM, MN, MO, MP, MQ, MR, MS, MT, MU, MV, MW, MX, MY, MZ, NA, NC, NE, NF, NG, NI, NL, NO, NP, NR, NU, NZ, OM, PA, PE, PF, PG, PH, PK, PL, PM, PN, PR, PS, PT, PW, PY, QA, RE, RO, RS, RU, RW, SA, SB, SC, SD, SE, SG, SH, SI, SJ, SK, SL, SM, SN, SO, SR, SS, ST, SV, SX, SY, SZ, TC, TD, TF, TG, TH, TJ, TK, TL, TM, TN, TO, TR, TT, TV, TW, TZ, UA, UG, US, UY, UZ, VA, VC, VE, VG, VI, VN, VU, WF, WS, XK, YE, YT, ZA, ZM, ZW.
   *       - `currencyCode` should be an ISO 4217 currency code. Allowed values: AFN, DZD, AOA, ANG, AWG, AUD, AZN, BSD, BHD, BDT, BBD, BYN, BZD, BMD, BTN, BOB, BAM, BWP, BRL, BND, BIF, KHR, CAD, CVE, KYD, XOF, XAF, XPF, CLP, COP, KMF, CDF, CRC, CZK, DKK, DJF, STD, DOP, XCD, EGP, SVC, ERN, ETB, EUR, FKP, FJD, GMD, GEL, GHS, GIP, GTQ, GNF, GYD, HTG, HNL, HKD, HUF, ISK, INR, IDR, IRR, IQD, IEP, ITL, JMD, JPY, JOD, KZT, KES, KWD, LAK, LBP, LSL, LRD, LYD, LTL, MOP, MKD, MGA, MWK, MYR, MVR, MRO, MUR, MXN, MDL, MNT, MAD, MZN, MMK, NAD, NPR, BGN, ILS, PLN, RON, RSD, TWD, TRY, NZD, NIO, NGN, KPW, NOK, ARS, PKR, PAB, PGK, PYG, PEN, UYU, PHP, GBP, QAR, OMR, RUB, RWF, WST, SAR, SCR, SLL, SGD, SBD, SOS, ZAR, KRW, LKR, SHP, SDG, SRD, SZL, SEK, CHF, SYP, TJS, TZS, THB, TOP, TTD, TND, TMT, AED, UGX, UAH, USD, UZS, VUV, VEB, VEF, VND, YER, CNY, YUM, ZMW, ZWD.
   *     tags:
   *       - Payment Management
   *     parameters:
   *       - in: header
   *         name: Authorization
   *         description: Access token for authentication.
   *         required: true
   *         type: string
   *         example: your_access_token
   *       - in: body
   *         name: paymentDetails
   *         description: Request model for creating a checkout session
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             context:
   *               type: object
   *               properties:
   *                 countryCode:
   *                   type: string
   *                   example: IN
   *                 orderId:
   *                   type: string
   *                   example: test12
   *             money:
   *               type: object
   *               properties:
   *                 amount:
   *                   type: string
   *                   example: 7568.50
   *                 currencyCode:
   *                   type: string
   *                   example: INR
   *             frontendReturnUrl:
   *               type: string
   *               example: https://www.google.com/
   *             statusNotifyUrl:
   *               type: string
   *               example: https://www.facebook.com/login.php
   *             frontendBackUrl:
   *               type: string
   *               example: https://www.instagram.com/
   *     responses:
   *       '200':
   *         description: Successfully created checkout session
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 sessionId:
   *                   type: string
   *                   example: session_1234567890
   *                 redirectUrl:
   *                   type: string
   *                   example: https://www.yourwebsite.com/checkout/session_1234567890
   *       '400':
   *         description: Bad request
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal server error
   */
  createCheckOutSession,
  /**
   * @swagger
   * /operation-inquiry:
   *   post:
   *     summary: checkout operation inquiry
   *     description: This endpoint fetches the details such as status, payment gateway, payment method and shopper details, for the requested operation
   *     tags:
   *       - Payment Management
   *     parameters:
   *       - in: body
   *         name: Redirection Result
   *         description: Request model for creating a checkout session
   *         required: true
   *         schema:
   *           type: object
   *           properties:
   *             token:
   *               type: string
   *               example: your-redirectionResult
   *     responses:
   *       '200':
   *         description: Successfully created checkout session
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 sessionId:
   *                   type: string
   *                   example: session_1234567890
   *                 redirectUrl:
   *                   type: string
   *                   example: https://www.yourwebsite.com/checkout/session_1234567890
   *       '400':
   *         description: Bad request
   *       '401':
   *         description: Unauthorized
   *       '500':
   *         description: Internal server error
   */
  operationInquiry
};
