import express from "express";
import {
  createServiceSection,
  getServiceSection,
  addServicePlan,
  deleteServicePlan,
  updateServiceSection,
  updateServicePlan
} from "../controllers/serviceController.js";

const router = express.Router();

router.post("/create", createServiceSection);
router.get("/", getServiceSection);

router.post("/add-plan", addServicePlan);
router.delete("/delete-plan/:id", deleteServicePlan);

router.put("/update-service/:id", updateServiceSection);
router.put("/update-plan/:id", updateServicePlan);

export default router;