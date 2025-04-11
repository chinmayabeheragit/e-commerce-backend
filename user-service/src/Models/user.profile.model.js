const mongoose = require("mongoose");
const shortid = require("shortid");

const userProfileSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `KIDTRYZ-USER-ENQ-${shortid.generate()}`,
  },
  userImage: {
    type: String,
    default: "default.jpg",
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  mobileNumber: {
    type: String,  
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "deactivate"],
    default: "active",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: String,
    required: true,
    unique: true,
  },
});

const UserProfile = mongoose.model("UserProfile", userProfileSchema);
module.exports = { UserProfile };

