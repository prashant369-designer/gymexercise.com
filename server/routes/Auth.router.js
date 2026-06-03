import express from "express";
const router = express.Router();

import {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUserRole,
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile,
  sendOtp,
  resetPassword,
  verifyOtp,
} from "../controllers/Auth.controller.js";

// Register
router.post("/register", register);
// Login
router.post("/login", login);
// Get all users
router.get("/allusers", getAllUsers);
// Delete user
router.delete("/deleteuser/:id", deleteUser);
// Update user role
router.put("/role/:id", updateUserRole);
// Create Profile
router.post("/createprofile", createProfile);
// Get Profile
router.get("/getprofile/:user_id", getProfile);
// Update Profile
router.put("/updateprofile/:user_id", updateProfile);
// Delete Profile
router.delete("/deleteprofile/:user_id", deleteProfile);
// Forgot Password
router.post("/forgotpassword", resetPassword);
// Send OTP
router.post("/sendotp", sendOtp);
// Verify OTP
router.post("/verifyotp", verifyOtp);

export default router;
