import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router"
import Message from '../../components/Message'
import ProgressSteps from "../../components/ProgressSteps"
import { toast } from 'react-toastify'
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice'
import Loader from '../../components/Loader'
import { clearCartItems } from "../../redux/features/cart/cartSlice"

const PlaceOrder = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)

    const [createorder, { isLoading, error }] = useCreateOrderMutation()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
            navigate('/shipping')
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate])

    const placeOrderHandler = async () => {
        try {
            const res = await createorder({
                orederItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice,
            }).unwrap()
            dispatch(clearCartItems())
            navigate(`/order/${res._id}`)
        } catch (error) {
            toast.error(error)
        }
    }

    return (
        <>
            <ProgressSteps step1 step2 step3 />
            <div className="container mx-auto mt-8">
                {cart.cartItems.length === 0 ? (
                    <Message>Your cart is empty</Message>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr>
                                    <td className="px-1 py-2 text-left align-top">image</td>
                                    <td className="px-1 py-2 text-left align-top">Product</td>
                                    <td className="px-1 py-2 text-left align-top">Qauntity</td>
                                    <td className="px-1 py-2 text-left align-top">Price</td>
                                    <td className="px-1 py-2 text-left align-top">Total</td>
                                </tr>
                            </thead>

                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className="p-2" >
                                            <img src={item.image} alt={item.name}
                                                className="w-16 h-16 object-cover"
                                            />
                                        </td>

                                        <td className="p-2">
                                            <Link to={`/product.${item.product}`}>{item.name}</Link>
                                        </td>
                                        <td className="p-2  ">
                                            {item.qty}
                                        </td>

                                        <td className="p-2 ">
                                            {item.price.toFixed(2)}
                                        </td>

                                        <td className="p-2 ">
                                            {(item.price * item.qty).toFixed(2)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold mb-5">Order Summary</h2>
                    <div className="flex justify-between flex-wrap p-8 bg-[#181818]">
                        <ul className="tet-lg">
                            <li>
                                <span className="font-semibold mb-4">Items:</span>
                                ${cart.itemsPrice}
                            </li>

                            <li>
                                <span className="font-semibold mb-4">shipping:</span>
                                ${cart.shippingPrice}
                            </li>

                            <li>
                                <span className="font-semibold mb-4">Tax:</span>
                                ${cart.taxPrice}
                            </li>

                            <li>
                                <span className="font-semibold mb-4">Total:</span>
                                ${cart.totalPrice}
                            </li>
                        </ul>
                        {error && <Message variant='danger' >
                            {error.data.message}
                        </Message>}

                        <div>
                            <h2 className="text-2xl mb-4 font-semibold" >Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4" >Payment Method</h2>
                            <strong>Mthod:</strong>
                            {cart.paymentMethod}
                        </div>
                    </div>

                    <button type="button" className="bg-pink-500 text-white py-2 px-4 rounded-full text-lg w-full mt-4"
                        disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                    >Place Order</button>

                    {isLoading && <Loader />}
                </div>

            </div>
        </>

    )
}
export default PlaceOrder