const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const bannerQuery = require("../queries/banner.query");
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
const addBanner = async (body, session) => {
  try {
    await checkBody(body);
    const banner = await bannerQuery.addBanner(body, session);
    return banner;
  } catch (error) {
    throw error;
  }
};
const listBanners = async () => {
  try {
    const banners = await bannerQuery.listBanners();
    return banners;
  } catch (error) {
    throw error;
  }
};
const editBanner = async (bannerId, updatedData) => {
  try {
    await checkBody(updatedData);
    const banner = await bannerQuery.findBannerById(bannerId);
    if (!banner) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Banner not found.",
        "The banner with the specified ID does not exist."
      );
    }
    const result = await bannerQuery.editBanner(bannerId, updatedData);
    return result;
  } catch (error) {
    throw error;
  }
};
const deleteBanner = async (bannerId, session) => {
  try {
    const banner = await bannerQuery.findBannerById(bannerId);
    if (!banner) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Banner not found.",
        "The banner with the specified ID does not exist."
      );
    }
    const deletedBanner = await bannerQuery.deleteBanner(bannerId);
    return deletedBanner;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addBanner,
  listBanners,
  editBanner,
  deleteBanner,
};
