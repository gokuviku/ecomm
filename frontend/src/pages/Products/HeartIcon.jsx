import { useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addFavouriteToLocalStorage, getFavouritesFromLocalStoge, removeFavouriteToLocalStorage } from '../../Utils/localStorage';
import { addToFavourites, removeFromFavourites, setFavourites } from '../../redux/features/favourites/favouriteSlice';


const HeartIcon = ({product}) => {

const dispatch = useDispatch()
const favourites = useSelector(state=> state.favourites)|| []
const isFavourite = favourites.some((p)=>p._id === product._id)

useEffect(()=>{
    const favouritesFromLocalStorage = getFavouritesFromLocalStoge()
    dispatch(setFavourites(favouritesFromLocalStorage))
},[]);

    const toggleFavourites = ()=>{
        if(isFavourite){
            dispatch(removeFromFavourites(product))
            removeFavouriteToLocalStorage(product._id)
        }else{
            dispatch(addToFavourites(product))
            dispatch(addFavouriteToLocalStorage(product))
        }
    }


  return (
    <div className='absolute top-2 right-5 cursor-pointer'>
        {
            isFavourite ? (<FaHeart onClick={toggleFavourites} className='text-pink-500'/>) : (<FaRegHeart className='text-white' />) 
        }
    </div>
  )
}
export default HeartIcon