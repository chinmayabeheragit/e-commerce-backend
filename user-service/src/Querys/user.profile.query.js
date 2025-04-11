const { UserProfile } = require('../Models/user.profile.model')
const createProfile = async (profileData, session) => {
    try {
        const newProfile = new UserProfile(profileData);
        await newProfile.save(session);
        return newProfile;
    } catch (error) {
        throw error;
    }
};
const updateProfile = async (profileData, session) => {
  try {
    const result = await UserProfile.findOneAndUpdate(
      { email: profileData.email },
      profileData,
      { new: true, session }  // `new: true` returns the updated document
    );
    return result;
  } catch (error) {
    throw error;
  }
};

  const updatePhoneNumber = async (profileId, phoneNumber, userName, session) => {
    try {
      const result = await UserProfile.updateOne(
        { _id: profileId },
        { $set: { mobileNumber: phoneNumber, updatedBy: userName, updatedAt: new Date() } },
        { session }
      );
      return result;
    } catch (error) {
      throw error;
    }
  };

const deactivateAccount = async (id, status) => {
    try {
        const result = await UserProfile.findByIdAndUpdate(
            id,
            { $set: { status: status } },
            { new: true }
          );
          return result;
    } catch (error) {
      throw error;
    }
  };
  
  
  const viewUserProfile = async (profileId, email) => {
    try {
      const userProfile = await UserProfile.findOne({ _id: profileId, email: email });
      if (!userProfile) {
        throw new Error("Profile not found or email does not match.");
      }
      return userProfile;
    } catch (error) {
      throw error;
    }
  };
  
  const findProfileByEmail = async (email, session) => {
    try {
      return await UserProfile.findOne({ email }).session(session).exec();
    } catch (error) {
      throw error;
    }
  };

  const getProfileById = async (profileId, session) => {
    try {
      const profile = await UserProfile.findById(profileId).session(session);
      return profile;
    } catch (error) {
      throw error;
    }
  };
  const findUserProfileById = async (profileId) => {
    try {
      return await UserProfile.findById(profileId);
    } catch (error) {
      throw error;
    }
  };

  const getProfileByPhoneNumber = async (phoneNumber, session) => {
    try {
      const profile = await UserProfile.findOne({ mobileNumber: phoneNumber }).session(session);
      return profile;
    } catch (error) {
      throw error;
    }
  };
  const findUserProfileByEmail = async (email) => {
    try {
      return await UserProfile.findOne({ email });
    } catch (error) {
      throw error;
    }
  };
  


module.exports = {
    createProfile,
    updateProfile,
    updatePhoneNumber,
    deactivateAccount,
    viewUserProfile,
    findProfileByEmail,
    getProfileById,
    getProfileByPhoneNumber,
    findUserProfileById,
    findUserProfileByEmail
}