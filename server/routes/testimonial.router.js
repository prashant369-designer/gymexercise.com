import express from "express";
const router = express.Router();

import { createTestimonial, getTestimonials, deleteTestimonial, updateTestimonial } from "../controllers/Testimonial.controller.js";

router.post("/create", createTestimonial);
router.get("/", getTestimonials);
router.delete("/delete/:id", deleteTestimonial);
router.put("/update/:id", updateTestimonial);

export default router;