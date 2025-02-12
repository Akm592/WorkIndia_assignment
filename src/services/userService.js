import userRepository from "../repositories/userRepository.js";

const getUserDetails = async (userId) => {
  return await userRepository.getUserById(userId);
};

export default {
  getUserDetails,
};
