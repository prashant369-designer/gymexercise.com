import express from 'express';
const router = express.Router();

import { AllUser, AllAdmin,AllProduct,LowStockProducts,topSellingProducts } from '../controllers/SuperDash.controller.js';

router.get("/user", AllUser);
router.get("/admin", AllAdmin);
router.get("/product", AllProduct);
router.get("/lowstock", LowStockProducts);
router.get("/topselling", topSellingProducts);

export default router;