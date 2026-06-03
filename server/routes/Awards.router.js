import express from "express";
const router = express.Router();

import { createAwards, getAwards, deleteAwards, updateAwards } from "../controllers/Award.controller.js";

router.post("/create", createAwards);
router.get("/", getAwards);
router.delete("/delete/:id", deleteAwards);
router.put("/update/:id", updateAwards);

export default router;