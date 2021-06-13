import express, { Router } from "express";
import productRouter from "./product";

const router: Router = express.Router();

router.use("/", productRouter);

export default router;
