import express from "express";
const router = express.Router();

import { createScroller, getScroller, deleteScroller, updateScroller } from "../controllers/ScrollerHeading.js";
    
router.post("/create", createScroller);
router.get("/", getScroller);
router.delete("/delete/:id", deleteScroller);
router.put("/update/:id", updateScroller);

export default router;