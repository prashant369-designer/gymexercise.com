import express from "express";
const router = express.Router();

import { createGallery, getGallery } from "../controllers/Gallery.controller.js";

router.post("/", createGallery);
router.get("/", getGallery);

export default router;