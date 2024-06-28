import express from "express";
const router = express.Router()

import {
    calculateTotalSales,
    calculateTotalSalesByDate,
    countTotalOrders,
    createOrder,
    findOrderById,
    getAllOrders,
    getUserOrders,
    markOrderAsDelivered,
    markOrderAsPaid,
} from '../controllers/orderController.js';
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js';

router.route('/')
    .post(authenticate, createOrder)
    .get(authenticate, authorizeAdmin, getAllOrders)

router.route('/mine')
    .get(authenticate, getUserOrders)

router.route('/total-orders')
    .get(countTotalOrders)

router.route('/total-sales')
    .get(calculateTotalSales)

router.route('/total-sales-by-date')
    .get(calculateTotalSalesByDate)

router.route('/:id')
.get(findOrderById)

router.route('/:id/pay')
.put(authenticate,markOrderAsPaid)

router.route('/:id/deliver')
.put(authenticate,authorizeAdmin,markOrderAsDelivered)


export default router        