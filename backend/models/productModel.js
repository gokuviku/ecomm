import mongoose from 'mongoose';
const { ObjectId } = mongoose.Schema

const reviewSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

},
    { timestamps: true });

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true

    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    category: {
        type: ObjectId,
        ref: "Category",
        required: true
    },
    countInStock: {
        type: Number,
        default: 0,
        required: true

    },
    reviews: [reviewSchema],
    rating: {
        type: Number,
        default: 0,
        required: true
    },
    numReviews: {
        type: Number,
        default: 0,
        required: true
    }
}, { timestamps: true });


const Product = mongoose.model('Product', productSchema);

export default Product
