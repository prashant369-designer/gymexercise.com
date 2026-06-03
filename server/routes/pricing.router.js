import express from "express";
import {
  createPrizingSection,
  getPriceSection,
  addPricePlan,
  deletePricePlan,
  updatePriceSection,
  updatePricePlan
} from "../controllers/Prizing.controller.js";

const router = express.Router();

router.post("/create", createPrizingSection);
router.get("/", getPriceSection);

router.post("/add-plan", addPricePlan);
router.delete("/delete-plan/:id", deletePricePlan);

router.put("/update-service/:id", updatePriceSection);
router.put("/update-plan/:id", updatePricePlan);

export default router;