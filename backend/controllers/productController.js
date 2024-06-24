import mongoose from 'mongoose';
import asyncHandler from "../middlewares/asyncHandler.js";
import Product from '../models/productModel.js';

const addProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand, image } = req.fields;
        // Validation
        switch (true) {
            case !name:
                return res.status(400).json({ error: "Name is required." });
            case !description:
                return res.status(400).json({ error: "Description is required." });
            case !price:
                return res.status(400).json({ error: "Price is required." });
            case !category:
                return res.status(400).json({ error: "Category is required." });
            case !quantity:
                return res.status(400).json({ error: "Quantity is required." });
            case !brand:
                return res.status(400).json({ error: "Brand is required." });
            case !image:
                return res.status(400).json({ error: "Image is required." });
            default:
                break;
        }

        const product = new Product({ ...req.fields });
        await product.save();
        res.json(product);

    } catch (error) {
        console.error("Error adding product:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const updateProduct = asyncHandler(async (req, res) => {
    try {
        const { name, description, price, category, quantity, brand, image } = req.fields;
        // Validation
        switch (true) {
            case !name:
                return res.status(400).json({ error: "Name is required." });
            case !description:
                return res.status(400).json({ error: "Description is required." });
            case !price:
                return res.status(400).json({ error: "Price is required." });
            case !category:
                return res.status(400).json({ error: "Category is required." });
            case !quantity:
                return res.status(400).json({ error: "Quantity is required." });
            case !brand:
                return res.status(400).json({ error: "Brand is required." });
            case !image:
                return res.status(400).json({ error: "Image is required." });
            default:
                break;
        }

        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, { ...req.fields }, { new: true });
        res.json(updatedProduct);

    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.json(product);
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchProduct = asyncHandler(async (req, res) => {
    try {
        const pageSize = 6;
        const keyword = req.query.keyword
            ? {
                name: {
                    $regex: req.query.keyword,
                    $options: "i"
                }
            } : {};

        const count = await Product.countDocuments({ ...keyword });
        const products = await Product.find({ ...keyword }).limit(pageSize);

        res.json({
            products,
            page: 1,
            pages: Math.ceil(count / pageSize),
            hasMore: false,
        });

    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const getProductById = asyncHandler(async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            return res.json(product);
        } else {
            return res.status(404).json({ message: "Product not found" });
        }
    } catch (error) {
        console.error("Error fetching product by ID:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({})
            .populate('category')
            .limit(12)
            .sort({ createdAt: -1 });

        res.json(products);

    } catch (error) {
        console.error("Error fetching all products:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const addProductReview = asyncHandler(async (req, res) => {
    try {
        const { rating, comment, userId } = req.body;
        const product = await Product.findById(req.params.id);

        if (product) {
            const alreadyReviewed = product.reviews.find(
                (r) => r.user.toString() === userId.toString()
            );

            if (alreadyReviewed) {
                return res.status(400).json({ error: "Product already reviewed" });
            }

            const review = {
                name: req.user ? req.user.username : "Anonymous",
                rating: Number(rating),
                comment,
                user: new mongoose.Types.ObjectId(userId)
            };

            product.reviews.push(review);
            product.rating = (product.rating * product.numReviews + Number(rating)) / (product.numReviews + 1);
            product.numReviews += 1;

            await product.save();
            res.status(201).json({ message: "Review added" });
        } else {
            res.status(404).json({ error: "Product not found" });
        }

    } catch (error) {
        console.error("Error adding product review:", error);
        res.status(500).json({ error: "Server error" });
    }
});

const fetchTopProduct = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({ rating: -1 }).limit(4);
        res.json(products);
    } catch (error) {
        console.error("Error fetching top products:", error);
        res.status(500).json({ error: "Server error" });
    }
});


const fetchNewProducts = asyncHandler(async (req,res)=>{
    try {
        const products = await Product.find({}).sort({ _id: -1 }).limit(5);
        res.json(products);

        
    } catch (error) {
        console.error("Error fetching top products:", error);
        res.status(500).json({ error: "Server error" });
    }
    
});


const filterProducts = asyncHandler(async (req, res) => { 
    try {
        const {checked,radio} = req.body
        let args = {}

        if(checked.length > 0 ) args.category = checked;
        if (checked.length ) args.price = {$gte: radio[0], $lte:radio[0]}
        const products = await Product.find(args)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"Server Error"})
        
        
    }
})

export {
    addProduct,
    addProductReview,
    deleteProduct,
    fetchAllProducts,
    fetchNewProducts,
    fetchProduct,
    fetchTopProduct, filterProducts, getProductById,
    updateProduct
};

