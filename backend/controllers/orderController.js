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

const countTotalOrders = async (req, res) => {
    const totalOrders = await Order.countDocuments()
    res.json({ totalOrders })
}

const calculateTotalSales = async (req, res) => {
    try {
        const orders = await Order.find()
        const totalSales = orders.reduce((sum, order) => sum + order.totalPrice, 0)
        res.json({ totalSales })

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const calculateTotalSalesByDate = async (req, res) => {

    try {
        const salesByDate = await Order.aggregate([
            {
                $match: {
                    isPaid: true,

                },
            },


            {
                $group: {
                    _id: {
                        $dateToString: { $formate: '%Y-%m-%d', date: '$paidAt' }
                    },
                    totalSales: { $sum: "$totalPrice" },
                },
            },
        ])
        res.json(salesByDate)
    } catch (error) {
        res.status(500).json({ error: error.message });

    }

}

const findOrderById = async (req, res) => {

    try {
        const order = await Order.findById(req.params.id).populate("user", "username email")
        if (order) {
            res.json(order)
        } else {
            res.status(404)
            throw new Error("Order not found")
        }
    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

const markOrderAsPaid = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)

        if (order) {
            order.isPaid = true;
            order.paidAt = Date.now();
            order.paymentResult = {
                id: req.body.id,
                status: req.body.status,
                update_time: req.body.update_time,
                email_address: req.body.email_address
            }

            const updatedOrder = await order.save()
            res.status(200).json(updatedOrder)
        } else {
            res.status(404)
            throw new Error("Order not found")
        }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const markOrderAsDelivered = async (req, res) => {
    try {
        const order = Order.findById(req.params.id)

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = Date.now();
            const updatedOrder = await order.save()
            res.status(200).json(updatedOrder)

        } else {
            res.status(404)
            throw new Error("Order not found")
        }

    } catch (error) {
        res.status(500).json({ error: error.message });

    }
}

export {
    createOrder,
    getAllOrders,
    getUserOrders,
    calculateTotalSales,
    calculateTotalSalesByDate,
    countTotalOrders,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered,
};

