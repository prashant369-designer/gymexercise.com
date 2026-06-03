import express from "express";
const router = express.Router();

import { createaboutus, getaboutus, deleteaboutus, updateaboutus } from "../controllers/AboutUs.controller.js";

router.post("/create", createaboutus);
router.get("/", getaboutus);
router.delete("/delete/:id", deleteaboutus);
router.put("/update/:id", updateaboutus);

export default router;
