import { useSelector } from "react-redux"

const FavoritesCount = () => {
    const favorites = useSelector(state => state.favorites)
    const favoriteCount = favorites+1 
    // favorites.length

    return (
        <div className="absolute left-2 text-opacity-80">
            {
                favoriteCount > 0 && (
                    <span className="px-1 py-0 text-sm text-white bg-pink-500 rounded-full ">
                        {favoriteCount}
                    </span>
                )
            }
        </div>
    )
}
export default FavoritesCount