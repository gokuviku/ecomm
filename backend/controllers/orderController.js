import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";

// Utility Function
function calcPrice(orderItems) {
    const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxRate = 0.15;
    const taxPrice = (itemsPrice * taxRate).toFixed(2);
    const totalPrice = (itemsPrice + shippingPrice + parseFloat(taxPrice)).toFixed(2);

    return {
        itemsPrice: itemsPrice.toFixed(2),
        shippingPrice: shippingPrice.toFixed(2),
        taxPrice,
        totalPrice,
    };
}

const createOrder = async (req, res) => {
    try {
        const { orderItems, shippingAddress, paymentMethod } = req.body;
        if (!orderItems || orderItems.length === 0) {
            return res.status(400).json({ message: 'No Order Items' });
        }

        const itemsFromDb = await Product.find({
            _id: { $in: orderItems.map((x) => x._id) }
        });

        const dbOrderItems = orderItems.map((itemFromClient) => {
            const matchingItemFromDB = itemsFromDb.find((itemFromDb) => itemFromDb._id.toString() === itemFromClient._id);

            if (!matchingItemFromDB) {
                return res.status(404).json({ message: 'Product Not Found' });
            }

            return {
                ...itemFromClient,
                product: itemFromClient._id,
                price: matchingItemFromDB.price,
                _id: undefined,
            };
        });

        const { itemsPrice, taxPrice, shippingPrice, totalPrice } = calcPrice(dbOrderItems);

        const order = new Order({
            orderItems: dbOrderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            user: req.user._id,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("user", "id username")
        res.json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

}

const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
        res.json(orders)

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const countTotalOrders = async (req, res) => {  }


export { createOrder, getAllOrders, countTotalOrders, getUserOrders };

