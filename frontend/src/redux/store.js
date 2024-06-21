import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query/react"
import { getFavouritesFromLocalStoge } from '../Utils/localStorage'
import favouritesReducer from '../redux/features/favourites/favouriteSlice'
import { apiSlice } from "./api/apiSlice"
import authReducer from "./features/auth/authSlice"
import cartSliceReducer from "./features/cart/cartSlice"

const initialFavourites = getFavouritesFromLocalStoge() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favourites:favouritesReducer,
        cart:cartSliceReducer,
    },

    preloadedState:{
        favourites:initialFavourites,
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
})

setupListeners(store.dispatch)
export default store