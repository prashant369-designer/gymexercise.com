import express from "express";
import {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} from "../controllers/Wishlist.controller.js";

const router = express.Router();

// Add
router.post("/add", addToWishlist);

// Get user wishlist
router.get("/:user_id", getWishlist);

// Remove
router.delete("/remove", removeFromWishlist);

export default router;