import express from "express";
const router = express.Router();
import { upload } from "../Middleware/multer.js";

import { createBlogs, getBlogs, deleteBlogs,updateBlogs,getBlogsById } from "../controllers/Blog.controller.js";

router.post("/create", upload.single("BlogImage"), createBlogs);
router.get("/", getBlogs);
router.get("/:id", getBlogsById);
router.delete("/delete/:id", deleteBlogs);
router.put("/update/:id", updateBlogs);

export default router;