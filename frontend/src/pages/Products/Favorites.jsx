import { useSelector } from "react-redux"
import { selectFavouriteProduct } from '../../redux/features/favourites/favouriteSlice'
import Product from "./Product"


const Favorites = () => {
    const favorites= useSelector(selectFavouriteProduct)


  return (
    <div className="ml-[10rem]" >
        <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
            FAVOURITE PRODUCTS
        </h1>

        <div className="flex flex-wrap">
            {favorites.map((product)=>(
                <Product key={product._id} product={product} />
            ))}
        </div>
    </div>
  )
}
export default Favorites