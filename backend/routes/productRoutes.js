import express from 'express'
import formidable from 'express-formidable'
import {
    addProduct,
    addProductReview,
    deleteProduct,
    fetchAllProducts,
    fetchNewProducts,
    fetchProduct,
    fetchTopProduct,
    getProductById,
    updateProduct,
} from '../controllers/productController.js'
import { authenticate, authorizeAdmin } from '../middlewares/authMiddleware.js'
import checkId from '../middlewares/checkId.js'
const router = express.Router()

router.route('/')
    .post(authenticate, authorizeAdmin, formidable(), addProduct)
    .get(fetchProduct)

router.route('/:id')
    .put(authenticate, authorizeAdmin, formidable(), updateProduct)
    .delete(authenticate, authorizeAdmin, formidable(), deleteProduct)
    .get(getProductById)

router.route('/allproducts')
.get(fetchAllProducts)

router.route('/:id/reviews')
    .post(authenticate, authorizeAdmin,checkId,addProductReview)

router
.get('/top', fetchTopProduct)
.get('/new',fetchNewProducts)



export default router
