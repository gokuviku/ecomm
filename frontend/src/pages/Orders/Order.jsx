import {
    PayPalButtons,
    usePayPalScriptReducer
} from '@paypal/react-paypal-js'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Message from "../../components/Message"
import Loader from "../../components/Loader"
import { Link, useParams } from 'react-router-dom'
import {
    useDeliverOrderMutation,
    useGetOrderDetailsQuery,
    useGetPaypalClientIdQuery,
    usePayOrderMutation,
} from '../../redux/api/orderApiSlice'
import toast from 'react-toastify'

const Order = () => {
    const { id: orderId } = useParams()

    const { data: order, refetch, isLoading, error } = useGetOrderDetailsQuery(orderId)

    const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation()

    const [deliverOrder, { isLoading: loadingDeliver }] = useDeliverOrderMutation()

    const { data: paypal, isLoading: loadingPayPal, error: errorPayPal } = useGetPaypalClientIdQuery()

    const { userInfo } = useSelector((state) => state.auth)
    const [{ isPending }, paypalDispatch] = usePayPalScriptReducer()


    useEffect(() => {
        if (!errorPayPal && !loadingPayPal && !paypal.clientId) {
            const loadingPayPalScript = async () => {
                paypalDispatch({
                    type: "resteOption",
                    value: {
                        "currency": "USD",
                        "clientid": paypal.clientId
                    },
                })
                paypalDispatch({ type: 'setLoadingStatus', value: 'pending' })
            }

            if (order && !order.Paid) {
                if (!window.paypal) {
                    loadingPayPalScript()
                }
            }
        }
    }, [errorPayPal, loadingPayPal, order, paypal, paypalDispatch])

    function createOrder(data, actions) {
        return actions.order
            .create({
                purchase_units: [{ amount: { value: order.totalPrice } }]
            })
            .then((orderId) => {
                return orderId
            })
    }

    function onApprove(data, actions) {
        return actions.order
            .capture()
            .then(async function (details) {
                try {
                    await payOrder({ orderId, details })
                    refetch()
                    toast.success('Order is Paid')

                } catch (error) {
                    toast.error(error?.data?.message || error.message)
                }
            })
    }

    function onError(err) {
        toast.error(err.message)
    }

    const deliverHandler = async () => {
        await deliverOrder(orderId)
        refetch()
    }

    return isLoading ? (<Loader />) : error ? (<Message variant='danger'>{error.data.message}</Message>) :
        (
            <div className='container flex flex-col ml-[10rem] md:flex-row'>
                <div className="md:w-2/3 pr-4">
                    <div className="border-gray-300 mt-5 pb-4 mb-5">
                        {order.orderItems.length === 0 ? (
                            <Message>Order Is Empty</Message>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-[80%]">
                                    <thead className="border-b-2">
                                        <tr>
                                            <th className='p-2' >image</th>
                                            <th className='p-2' >Product</th>
                                            <th className='p-2 text-center ' >Quantity</th>
                                            <th className='p-2' >Unit Price</th>
                                            <th className='p-2' >Total</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {order.orderItems.map((item, index) => (
                                            <tr key={index} >
                                                <td className="p-2">
                                                    <img src={item.image} alt={item.name}
                                                        className='w-1 h-16 object-cover'
                                                    />
                                                </td>

                                                <td className="p-2">
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </td>
                                                <td className="p-2 text-center">{item.quantity}</td>
                                                <td className="p-2">{item.price}</td>
                                                <td className="p-2">{(item.price * item.quantity).toFixed(2)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
                <div className="md:w-1/3">
                    <div className="mt-5 border-gray-300 pb-4 mb-4">
                        <h2 className='text-xl font-bold mb-2' >Shipping</h2>
                        <p className="mb-4 mt-4">
                            <strong className="text-pink-500">Order:</strong>{order._id}
                        </p>
                        <p className="mb-4">
                            <strong className="text-pink-500">Name:</strong>{order.user.username}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-500">Email:</strong>{order.user.email}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-500">Address:</strong>{" "}
                            {order.shippingAddress.address}, {order.shippingAddress.city} {" "}
                            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                        </p>

                        <p className="mb-4">
                            <strong className="text-pink-500">Method:</strong>{" "}
                            {order.paymentMethod}
                        </p>
                        {order.ispaid ? (
                            <Message variant='success' className='text-pink-500'>
                                Paid On {order.paidAt}
                            </Message>
                        ) : (
                            <Message variant='danger' >
                                Not Paid
                            </Message>
                        )}
                    </div>

                    <h2 className="text-xl font-bold mb-2 mt-[3rem]"> Order Summary</h2>

                    <div className="flex justify-between mb-2">
                        <span>$ {order.itemsPrice}Items</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>$ {order.shippingPrice} Shipping</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>$ {order.taxPrice}Tax</span>
                    </div>

                    <div className="flex justify-between mb-2">
                        <span>$ {order.totalPrice} Total</span>
                    </div>

                    {!order.isPaid && (
                        <div>
                            {loadingPay && <Loader />}
                            {isPending ? (<Loader />) : (
                                <div>
                                    <div>
                                        <PayPalButtons
                                            createOrder={createOrder}
                                            onApprove={onApprove}
                                            onError={onError}
                                        >

                                        </PayPalButtons>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {loadingDeliver && <Loader />}
                    {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered(
                        <div>
                            <button
                                type='button'
                                className='bg-pink-500 text-white w-full py-2'
                                onClick={deliverHandler}
                            >
                                Mark As Delivered
                            </button>
                        </div>
                    )}
                </div>
            </div>
        )
}
export default Order