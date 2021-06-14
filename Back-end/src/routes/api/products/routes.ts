import express, { Router } from "express";
import productRouter from "./product";
import categoryRouter from "./category";

const router: Router = express.Router();

router.use("/", productRouter);
router.use("/category", categoryRouter);

export default router;
