import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { addToCart } from '../../redux/features/cart/cartSlice'
import { toast } from 'react-toastify'
import HeartIcon from './HeartIcon'

const dispatch = useDispatch()
const addToCartHandler=(product,qty)=>{
    dispatch(addToCart({...product,qty}))
    toast.success('Item Added Successfully',{
        position:toast.POSITION.RIGHT,
        autoClose:2000
    })
}

const ProductCard = ({ p }) => {
    return (
        <div className='max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
            <section className='relative' >
                <Link to={`/product/${p._id}`} >
                    <span className='absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300' >{p?.brand}</span>
                    <img
                        src={p.image}
                        alt={p.name}
                        style={{ height: '170px', objectFit: 'cover' }}
                        className='cursor-pointer w-full'
                    />
                </Link>
                <HeartIcon product={p} />
            </section>
            <div className="p-5">
                <div className="flex justify-between">
                    <h5 className="mb-2 text-xl text-white dark:text-white">
                        {p?.name}
                    </h5>
                    <p className='text-black font-semibold text-pink-500' >
                        {p?.price?.toLocalString('en-US', {
                            style: 'currency',
                            currency: 'USD'
                        })}
                    </p>
                </div>
                <p className="mb-3 font-normal text-[#CFCFCF]">
                    {p?.description?.substring(0, 60)}...
                </p>

                <section className="flex justify-between items-center">
                    <Link className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring:outline-none focus:ring-pink-700 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800  ' >
                        Read More
                        <svg><path /></svg>
                    </Link>
                    <button className="p-2 rounded-full"
                        onClick={() => addToCartHandler(p, 1)}>
                        <AiOutlineShoppingCart size={25} />

                    </button>
                </section>
            </div>
        </div>
    )
}
export default ProductCard