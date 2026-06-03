import express from "express";
import {
  createPricingPlan,
  getPricingPlan,
  updatePricingPlan,
  deletePricingPlan
} from "../controllers/WelcomeGym.controller.js";

const router = express.Router();

router.post("/create", createPricingPlan);
router.get("/", getPricingPlan);
router.put("/update/:id", updatePricingPlan);
router.delete("/delete/:id", deletePricingPlan);

export default router;