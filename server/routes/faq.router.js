import express from "express";
const router = express.Router();
import { createFaq, getFaqs, updateFaq, deleteFaq } from "../controllers/Faq.controller.js";

router.post("/create", createFaq);
router.get("/get", getFaqs);
router.put("/update/:id", updateFaq);
router.delete("/delete/:id", deleteFaq);

export default router;