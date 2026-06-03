import express from "express";
const router = express.Router();

import { createAboutUs, getAboutUs, deleteAboutUs, updateAboutUs } from "../controllers/AboutUs.controller.js";

router.post("/create", createAboutUs);
router.get("/", getAboutUs);
router.delete("/delete/:id", deleteAboutUs);
router.put("/update/:id", updateAboutUs);

export default router;