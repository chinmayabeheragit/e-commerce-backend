const customException = require("../../../common-libs/exception/customException");
const statusCode = require("../../../common-libs/utils/statusCode");
const categoryQuery = require("../queries/category.query");
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
const checkCategoryById = async(id)=>{
  try {
    const category = await categoryQuery.viewCategory_categoryId(id);
    if (!category) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Category Not Found",
        `No category found with ID ${id}. Please verify the category ID and try again.`
      );
    }
    return category;
  } catch (error) {
    throw error;
  }
}
const addCategory = async (body, session) => {
  try {
    await checkBody(body);
    const category = await categoryQuery.addCategory(body, session);
    return category;
  } catch (error) {
    throw error;
  }
};
const viewCategories = async () => {
  try {
    const categories = await categoryQuery.viewCategories();
    if (!categories) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Categories Not Found",
        "No categories were found in the database. Please verify if the categories have been properly created and try again."
      );
    }
    return categories;
  } catch (error) {
    throw error;
  }
};
const editCategory = async (categoryId, updatedData) => {
  try {
    await checkBody(updatedData);
    const category = await checkCategoryById(categoryId);
    if (category.status === "request") {
      throw customException.error(
        statusCode.FORBIDDEN,
        "Category Pending Approval",
        "This category is pending approval and cannot be edited. Please accept the category before making changes."
      );
    }
    const updatedCategory = await categoryQuery.editCategory(
      categoryId,
      updatedData
    );
    return updatedCategory;
  } catch (error) {
    throw error;
  }
};
const deleteCategory = async (categoryId) => {
  try {
    await checkCategoryById(categoryId);
    const deletedCategory = await categoryQuery.deleteCategory(categoryId);
    return deletedCategory;
  } catch (error) {
    throw error;
  }
};
const viewCategory_categoryId = async (categoryId) => {
  try {
    const category = await checkCategoryById(categoryId);
    return category;
  } catch (error) {
    throw error;
  }
};
const findStatusAccCat = async () => {
  try {
    const categories = await categoryQuery.findStatusAccCat();
    if (!categories) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Categories Not Found",
        "No categories were found in the database. Please verify if the categories have been properly created and try again."
      );
    }
    return categories;
  } catch (error) {
    throw error;
  }
};
const viewReqCatByVendor = async () => {
  try {
    const categories = await categoryQuery.findReqCatByVendor();
    if (!categories || categories.length === 0) {
      throw customException.error(
        statusCode.NOT_FOUND,
        "Requested Categories Not Found",
        "No requested categories were found for the vendor. Please check if there are any pending category requests and try again."
      );
    }
    return categories;
  } catch (error) {
    throw error;
  }
};
const upCatStatus = async (id, data) => {
  try {
    await checkCategoryById(id);
    const statusUpdateCategory = await categoryQuery.upCatStatus(id, data);
    return statusUpdateCategory;
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
  findStatusAccCat,
  viewReqCatByVendor,
  upCatStatus,
};
