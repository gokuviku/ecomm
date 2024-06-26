import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Product from './Products/Product';
import { useGetTopProductQuery } from '../redux/api/productApiSlice';

const Home = () => {
  const keyword = useParams()
  const { data, isLoading, isError } = useGetTopProductQuery({ keyword });
  return <>
    {!keyword ? <Header /> : null}
    {isLoading ? <Loader /> : isError ? (<Message variant="danger">
      {isError?.data.message || isError.error}
    </Message>) : (
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-[3rem] mt-[10rem] ml-[20rem]">Special Products</h1>

          <Link to='/shop' className='bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]' >Shop</Link>

        </div>


        <div className="flex justify-center flex-wrap mt-[2rem]">
          {
            data.products.map((product) => (
              <div key={product._id} >
                <Product product={product} />
              </div>
            ))
          }
        </div>
      </>
    )}
  </>
}

export default Home