import express from "express";
const router = express.Router();

import { createquote, getquote,deletequote } from "../controllers/Quote.controller.js";

router.post("/create", createquote);
router.get("/", getquote);    
router.delete("/delete/:id", deletequote);      

export default router;