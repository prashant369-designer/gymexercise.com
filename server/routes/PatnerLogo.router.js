import express from "express";
const router = express.Router();

import { createPatnerLogo, getPatnerLogo, deletePatnerLogo, updatePatnerLogo } from "../controllers/PatnerLogo.controller.js";

router.post("/create", createPatnerLogo);
router.get("/", getPatnerLogo);
router.delete("/delete/:id", deletePatnerLogo);
router.put("/update/:id", updatePatnerLogo);

export default router;