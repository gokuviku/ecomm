import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { FaTrash } from 'react-icons/fa'
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice'

const Cart = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart

  const addToCarthandler = (product,qty)=>{
    dispatch(addToCart({product,qty}))
  }

  return (
    <>
      <div className="container flex flex-wrap justify-around items-start mx-auto mt-8">
        {cartItems.length === 0 ? (<div>Your Cart Is Empty <Link to='/shop' >Go To Shop</Link> </div>) :
          (
            <>
              <div className="flex flex-col w-[80%]">
                <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
                {cartItems.map((item)=>(
                  <div key={item._id} className='flex items-center mb-[1rem] pb-2 ' >
                    <div className="w-[5rem] h-5[rem]">
                      <img src={item.image} alt={item.name} className='w-full h-full object-cover rounded' />
                    </div>

                    <div className="flex-1 ml-4">
                      <Link to={`/product/${item._id}`} className='text-pink-500' >{item.name}</Link>
                      <div className="mt-2 text-white">{item.brand}</div>
                      <div className="mt-2 text-white">$ {item.price}</div>
                    </div>

                  <div className="w-24">
                    <select 
                    className='w-full p-1 border rounded text-black'
                     value={item.qty}
                     onChange={e=>addToCarthandler(item,Number(e.target.value))}
                     >
                      {[...Array(item.countInStock).keys()].map((x)=>{
                        <option key={x + 1} value={x + 1} >{x + 1}</option>
                      })}
                     </select>
                  </div>

                  </div>
                ))}
              </div>
            </>
          )
        }
      </div>
    </>
  )
}
export default Cart