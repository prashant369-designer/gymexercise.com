import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
  deleteProfile
} from "../controllers/Profile.controller.js";

const router = express.Router();

router.post("/create", createProfile);
router.get("/get/:user_id", getProfile);
router.put("/update:user_id", updateProfile);
router.delete("/delete:user_id", deleteProfile);

export default router;