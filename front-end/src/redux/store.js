import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import favoriteReducer from './features/favorites/favoriteSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites: favoriteReducer,
    },
})