import express, { Router } from "express";
import userRouter from "./users/routes";
import productRouter from "./products/routes";

const router: Router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
