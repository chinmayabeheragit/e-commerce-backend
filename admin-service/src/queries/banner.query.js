const {BannerModel } = require("../models/banner.model");
const addBanner = async (bannerData, session) => {
    try {
        const banner = new BannerModel(bannerData);
        await banner.save(session);
        return banner;
    } catch (error) {
        throw error;
    }
  };
  const listBanners = async () => {
    try {
      const allBanners = await BannerModel.find();
      return allBanners;
    } catch (error) {
      throw error;
    }
  };
  
  const editBanner = async (bannerId, updatedData) => {
    try {
        const result = await BannerModel.findOneAndUpdate({ _id: bannerId }, updatedData, { new: true});
        return result;
    } catch (error) {
        throw error;
    }
};
const deleteBanner = async (bannerId) => {
    try {
        const result = await BannerModel.findByIdAndDelete( bannerId );
        return result;
    } catch (error) {
        throw error;
    }
};
const findBannerById = async(id)=>{
    try {
        const banner = await BannerModel.findById(id);
        return banner;
    } catch (error) {
        throw error;
    }
}
module.exports = {
    addBanner,
    listBanners,
    editBanner,
    deleteBanner,
    findBannerById
};