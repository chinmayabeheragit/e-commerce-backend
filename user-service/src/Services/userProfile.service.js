const profileQuery = require("../Querys/userProfile.query");
const generateAuthToken = require("../middleware/token");
const bcrypt = require("bcrypt");
const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const saveUser = async (body, session) => {
  try {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const bodyWithHashedPassword = {
      ...body,
      password: hashedPassword,
    };
    return await profileQuery.saveUser(bodyWithHashedPassword, session);
  } catch (error) {
    throw error;
  }
};
const upUser = async (email, id, body) => {
  try {
    const user = await profileQuery.findByEmail(email);
    if (!user || (user._id !== id)) {
      throw customException.error(statusCode.NOT_FOUND, null, "Invalid Input");
    }
    if (body.password) {
      const hashedPassword = await bcrypt.hash(body.password, 10);
      body.password = hashedPassword;
    }
    return await profileQuery.upUser(id, body);
  } catch (error) {
    throw error;
  }
};

const loginUser = async ({ username, password }) => {
  try {
    const user = await profileQuery.findByEmail(username);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw customException.error(
        statusCode.NOT_FOUND,
        null,
        "Invalid Credentials"
      );
    }
    const role = "user";
    const token = await generateAuthToken.generateAuthToken(username, role);
    return [{ role: role, token: token, userDetails: user }];
  } catch (error) {
    throw error;
  }
};
const delUser = async (id) => {
  try {
    return await profileQuery.delUser(id);
  } catch (error) {
    throw error;
  }
};
const viewActiveUser = async () => {
  try {
    return await profileQuery.viewActiveUser();
  } catch (error) {
    throw error;
  }
};
const viewDelUser = async () => {
  try {
    return await profileQuery.delUser();
  } catch (error) {
    throw error;
  }
};
const viewAllUser = async () => {
  try {
    return profileQuery.viewAllUser();
  } catch (error) {
    throw error;
  }
};
module.exports = {
  saveUser,
  upUser,
  loginUser,
  delUser,
  viewActiveUser,
  viewDelUser,
  viewAllUser,
};
