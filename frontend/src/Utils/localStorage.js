// add, remove , update ,delete products from local storage

export const addFavouriteToLocalStorage = (product) => {
    const favourites = getFavouritesFromLocalStoge()

    if (!favourites.some((p) => p._id === product._id)) {
        favourites.push(product)
        localStorage.setItem('favourites', JSON.stringify(favourites))
    }
}
export const removeFavouriteToLocalStorage = (productId) => {
    const favourites = getFavouritesFromLocalStoge()

    const updateFavourites = favourites.filter((product) => product._id === productId)
    localStorage.setItem('favourites', JSON.stringify(updateFavourites))
}


export const getFavouritesFromLocalStoge = () => {

    const favouritesJSON = localStorage.getItem('favourites');

    return favouritesJSON ? JSON.parse(favouritesJSON) : [];
}