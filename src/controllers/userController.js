import userService from "../services/userService.js";

const getMyDetails = async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const userDetails = await userService.getUserDetails(userId);
    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }
    // Do not send password hash in response
    const userResponse = {
      id: userDetails.id,
      username: userDetails.username,
      role: userDetails.role,
    };
    res.json({ user: userResponse });
  } catch (error) {
    next(error);
  }
};

export default {
  getMyDetails,
};
