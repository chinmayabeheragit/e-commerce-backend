const { AdminBrand } = require("../models/adminbrand.model");
const createbrand = async (data, session) => {
  try {
    const brand = await new AdminBrand(data);
    await brand.save(session);
    return brand;
  } catch (error) {
    throw error;
  }
};
const findAllbrand = async () => {
  try {
    const brands = await AdminBrand.find();
    return brands;
  } catch (error) {
    throw error;
  }
};
const findStatusAccBrand = async () => {
  try {
    return await AdminBrand.find({ status: "accept" });
  } catch (error) {
    throw error;
  }
};
const findbrandById = async (brandId) => {
  try {
    const brand = await AdminBrand.findById(brandId);
    return brand;
  } catch (error) {
    throw error;
  }
};
const updatebrandById = async (brandId, updateData) => {
  try {
    const updatedBrand = await AdminBrand.findByIdAndUpdate(
      brandId,
      updateData,
      { new: true, runValidators: true }
    );
    return updatedBrand;
  } catch (error) {
    throw error;
  }
};
const editBrandStatus = async (id, data) => {
  try {
    const statusUpdatedBrand = await AdminBrand.findByIdAndUpdate(id, { status: data });
    return statusUpdatedBrand;
  } catch (error) {
    throw error;
  }
};
const deletebrandById = async (brandId) => {
  try {
      const deletedBrand = await AdminBrand.findByIdAndDelete(brandId);
      return deletedBrand;
  } catch (error) {
    throw error;
  }
};
const viewAllBrandReq = async () => {
  try {
    const brnads = await AdminBrand.find({ status: "request" });
    return brnads;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  createbrand,
  findAllbrand,
  findStatusAccBrand,
  findbrandById,
  updatebrandById,
  editBrandStatus,
  deletebrandById,
  viewAllBrandReq,
};
