const mongoose = require("mongoose");
const shortid = require("shortid");

const userProfileSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `PROD-USER-${shortid.generate()}`,
  },
  name: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true,
    unique: true,
  },
  profileImg: {
    type: String,
    default: null,
  },
  gender: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "active",
  },
});

const UserProfile = mongoose.model("userProfileDetails", userProfileSchema);

module.exports = { UserProfile };
