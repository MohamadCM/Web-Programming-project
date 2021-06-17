import express, { Router } from "express";
import userRouter from "./users/routes";
import productRouter from "./products/routes";
import orderRoutes from "./orders/routes";

const router: Router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/orders", orderRoutes);

export default router;
