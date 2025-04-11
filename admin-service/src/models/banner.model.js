const mongoose = require("mongoose");
const shortid = require("shortid");
const bannerSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: () => `KIDTRYZ-A-BANN-${shortid.generate()}`,
  },
  bannerName: {
    type: String,
    required: true,
  },
  categoryName: {
    type: String,
    required: true,
    enum: [
      "first hero image",
      "second hero image",
      "home center",
      "flat 60% off",
      "footer - 1",
      "footer - 2",
      "footer - 3",
    ],
  },
  imageOrVideoUpload: {
    type: String,
    required: true,
  },
  linkOrDestinationURL: {
    type: String,
    required: true,
  },
  displayStatus: {
    type: Boolean,
    default: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const BannerModel = mongoose.model("Banner", bannerSchema);

module.exports = {
  BannerModel,
};
