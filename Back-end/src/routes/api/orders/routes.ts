import express, { Router } from "express";
import orderRouter from "./order";

const router: Router = express.Router();

router.use("/", orderRouter);

export default router;
