import express, { Router } from "express";
import authRouter from "./auth";
import profileRouter from "./profile";
import authorize from "../../../middlewares/authorization";
import {Customer} from "../../../models/Customer";
import Constants from "../../../config/Constants";

const router: Router = express.Router();

router.use("/auth", authRouter);
router.use("/profile", authorize(new Customer(Constants.UNKNOWN, Constants.UNKNOWN)),profileRouter);

export default router;
