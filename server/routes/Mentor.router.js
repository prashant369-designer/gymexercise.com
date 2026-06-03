import express from "express";
const router = express.Router();

import { createMentor, getMentors, deleteMentors, updateMentors } from "../controllers/Mentor.Controller.js";

router.post("/create", createMentor);
router.get("/", getMentors);
router.delete("/delete/:id", deleteMentors);
router.put("/update/:id", updateMentors);

export default router;