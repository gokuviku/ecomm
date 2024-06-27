import express from "express";
const router = express.Router()

import { createOrder, getAllOrders, getUserOrders,countTotalOrders } from '../controllers/orderController';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware';

router.route('/')
.post(authenticate,createOrder)
.get(authenticate,authorizeAdmin,getAllOrders)

router.route('/mine')
    .get(authenticate, getUserOrders)

router.route('total-orders')
.get(countTotalOrders)

export default router        