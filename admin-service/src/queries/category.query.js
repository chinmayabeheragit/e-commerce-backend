const { CategoryModel } = require("../models/category.model");
const addCategory = async (categoryData, session) => {
  try {
    const category = new CategoryModel(categoryData);
    await category.save(session);
    return category;
  } catch (error) {
    throw error;
  }
};
const viewCategories = async () => {
  try {
    const categories = await CategoryModel.find();
    return categories;
  } catch (error) {
    throw error;
  }
};
const editCategory = async (categoryId, updatedData) => {
  try {
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      { _id: categoryId },
      updatedData,
      { new: true }
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};
const deleteCategory = async (categoryId) => {
  try {
    const deletedCategory = await CategoryModel.findByIdAndDelete(categoryId);
    return deletedCategory;
  } catch (error) {
    throw error;
  }
};
const viewCategory_categoryId = async (categoryId) => {
  try {
    const category = await CategoryModel.findById(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
};
const findReqCatByVendor = async () => {
  try {
    const reqCategories = await CategoryModel.find({ status: "request" });
    return reqCategories;
  } catch (error) {
    throw error;
  }
};
const upCatStatus = async (id, data) => {
  try {
    const updatedCategory = await CategoryModel.findByIdAndUpdate(id, { status: data });
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};
const findStatusAccCat = async () => {
  try {
    const acceptCategories = await CategoryModel.find({ status: "accept" });
    return acceptCategories;
  } catch (error) {
    throw error;
  }
};
module.exports = {
  addCategory,
  viewCategories,
  editCategory,
  deleteCategory,
  viewCategory_categoryId,
  findReqCatByVendor,
  upCatStatus,
  findStatusAccCat,
};
