import express from "express";
const router = express.Router()

import {authenticate,authorizeAdmin} from '../middlewares/authMiddleware'
import { createOrder } from "../controllers/orderController";

router.route('/')
.post(authenticate,createOrder)

export default router