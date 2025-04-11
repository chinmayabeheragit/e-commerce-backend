const customException = require('../../commons/exception/customException');
const ProfileQuery = require('../Querys/user.profile.query')
const statusCode = require('../../commons/utils/statusCode')
const Joi = require('joi');


const createProfile = async (body, userName, session) => {
  try {
    body.email = userName;
    const existingProfile = await ProfileQuery.findProfileByEmail(body.email, session);
    if (existingProfile) {
      throw customException.error(
        statusCode.DATA_ALREADY_EXISTS,
        "Profile already exists",
        "A profile using this email already exists"
      );
    }
    const result = await ProfileQuery.createProfile(body, session);
    return result;
  } catch (error) {
    throw error;
  }
};

const updateProfile = async (profileData, userName, session) => {
  try {
    // Validate mobile number and profile image
    const schema = Joi.object({
      mobileNumber: Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .label("Mobile number is required and should be 10 digits."),
      profileImage: Joi.string().optional().label("Profile image URL"),
    });

    const { error } = schema.validate({
      mobileNumber: profileData.mobileNumber,
      profileImage: profileData.profileImage,
    });

    if (error) {
      throw customException.error(
        statusCode.BAD_REQUEST,
        "Invalid mobile number format",
        "Mobile number is required and should be 10 digits."
      );
    }

    // Set the email from the userName (assuming it's the same as the email)
    profileData.email = userName;

    // Map `profileImage` to `userImage` in the schema
    if (profileData.profileImage) {
      profileData.userImage = profileData.profileImage;
    }

    // Remove `profileImage` from `profileData` to avoid redundancy
    delete profileData.profileImage;

    const result = await ProfileQuery.updateProfile(profileData, session);
    return result;
  } catch (error) {
    throw error;
  }
};


  

const updatePhoneNumber = async (profileId, phoneNumber, userName, session) => {
  try {
    const profile = await ProfileQuery.getProfileById(profileId, session);
    if (!profile) {
      throw customException.error(
        StatusCode.NOT_FOUND,
        "Profile not found",
        "A profile with this ID does not exist"
      );
    }

    // Check if the phone number already exists in another profile
    const existingProfileWithPhoneNumber = await ProfileQuery.getProfileByPhoneNumber(phoneNumber, session);
    if (existingProfileWithPhoneNumber && existingProfileWithPhoneNumber._id.toString() !== profileId) {
      throw customException.error(
        StatusCode.CONFLICT,
        "Phone number already in use",
        "A profile with this phone number already exists"
      );
    }

    // Update the phone number
    await ProfileQuery.updatePhoneNumber(profileId, phoneNumber, userName, session);
    
    // Retrieve the updated profile
    const updatedProfile = await ProfileQuery.getProfileById(profileId, session);
    return updatedProfile;
  } catch (error) {
    throw error;
  }
};






const deactivateAccount = async (id, status,updatedData) => {
    try {
        const result = await ProfileQuery.deactivateAccount(id, status,updatedData);
        if (!result) {
          throw customException.error(
            statusCode.NOT_FOUND,
            "Account not found.",
            `${id} is not associated with any account. Please check the ID and try again.`
          );
        }
        return result;
    } catch (error) {
      throw error;
    }
  };
  
  
  const viewUserProfileById = async (profileId) => {
    try {
      return await ProfileQuery.findUserProfileById(profileId);
    } catch (error) {
      throw new Error("Failed to fetch user profile");
    }
  };
  const viewUserProfileByEmail = async (email) => {
    try {
      return await ProfileQuery.findUserProfileByEmail(email);
    } catch (error) {
      throw new Error("Failed to fetch user profile");
    }
  };
  
module.exports = {
    createProfile,
    updateProfile,
    updatePhoneNumber,
    deactivateAccount,
    viewUserProfileById,
    viewUserProfileByEmail
};