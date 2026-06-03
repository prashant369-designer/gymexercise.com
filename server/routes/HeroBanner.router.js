import express from "express";
const router = express.Router();

import { CreateHeroBanner, getHeroBanner, deleteHeroBanner, updateHeroBanner } from "../controllers/Herobanner.controller.js";

router.post("/create", CreateHeroBanner);
router.get("/get", getHeroBanner);
router.delete("/delete/:id", deleteHeroBanner);
router.put("/update/:id", updateHeroBanner);

export default router;