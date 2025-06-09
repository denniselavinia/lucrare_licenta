import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import favoriteReducer from './features/favorites/favoriteSlice'
import puzzlesAPI from './features/puzzles/puzzlesAPI'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites: favoriteReducer,
        [puzzlesAPI.reducerPath]: puzzlesAPI.reducer,
       
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(puzzlesAPI.middleware),
})