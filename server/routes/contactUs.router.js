import express from "express";
const router = express.Router();

import { createcontactUs, getContactUs,deleteContactUs } from "../controllers/ContactUs.router.js";

router.post("/create", createcontactUs);
router.get("/", getContactUs);    
router.delete("/delete/:id", deleteContactUs);      

export default router;