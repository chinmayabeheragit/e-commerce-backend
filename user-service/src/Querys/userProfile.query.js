const { UserProfile } = require("../Models/userProfile.model");

const saveUser = async (body, session) => {
  try {
    return await new UserProfile(body).save(session);
  } catch (error) {
    throw error;
  }
};
const upUser = async (id, body) => {
  try {
    const user = await UserProfile.findByIdAndUpdate(id, body, { new: true });
    return user;
  } catch (error) {
    throw error;
  }
};
const viewAllUser = async () => {
  try {
    return await UserProfile.find();
  } catch (error) {
    throw error;
  }
};
const findByEmail = async (email) => {
  try {
    return await UserProfile.findOne({ email: email });
  } catch (error) {
    throw error;
  }
};
const delUser = async (id) => {
  try {
    return await UserProfile.findByIdAndUpdate(
      id,
      { status: "inactive" },
      { new: true }
    );
  } catch (error) {
    throw error;
  }
};
const viewDelUser = async () => {
  try {
    return await UserProfile.find({ status: "inactive" });
  } catch (error) {
    throw error;
  }
};
const viewActiveUser = async () => {
  try {
    return await UserProfile.find({ status: "active" });
  } catch (error) {
    throw error;
  }
};
const findUser = async(id)=>{
  try {
    return await UserProfile.findById(id);
  } catch (error) {
    throw error;
  }
}
module.exports = {
  saveUser,
  upUser,
  viewAllUser,
  delUser,
  findByEmail,
  viewDelUser,
  viewActiveUser,
  findUser
};
