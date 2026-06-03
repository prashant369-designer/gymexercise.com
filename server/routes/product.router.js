import express from "express";
import {
  CreateProduct,
  GetProduct,
  DeleteProduct,
  UpdateProduct,
  GetProductWithId,
  GetProductadmin,
} from "../controllers/Products.controller.js";

import { upload } from "../Middleware/multer.js"; 
import { verifyToken } from "../Middleware/auth.js"; 
const router = express.Router();

// create product with authentication and image upload
router.post("/create",verifyToken, upload.single("productImage"), CreateProduct);
// to get all products without authentication
router.get("/",GetProduct);
// get products for admin with authentication
router.get("/getadmin",verifyToken,GetProductadmin);
// get product with id 
router.get("/get/:id", GetProductWithId);
// delete product with id with authentication
router.delete("/delete/:id",verifyToken, DeleteProduct);
// update product with id with authentication
router.put("/update/:id",verifyToken, upload.single("productImage"), UpdateProduct);

export default router;