import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  removeFromCart,
} from "../controllers/Cart.controller.js";

const router = express.Router();

router.post("/add", addToCart);
router.get("/:user_id", getCart);
router.put("/update", updateCart);
router.delete("/remove", removeFromCart);

export default router;