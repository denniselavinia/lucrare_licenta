import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './features/cart/cartSlice'
import favoriteReducer from './features/favorites/favoriteSlice'
import puzzlesAPI from './features/puzzles/puzzlesAPI'
import ordersAPI from './features/orders/ordersAPI'
import sellsAPI from './features/sells/sellsAPI'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        favorites: favoriteReducer,
        [puzzlesAPI.reducerPath]: puzzlesAPI.reducer,
        [ordersAPI.reducerPath]: ordersAPI.reducer,
        [sellsAPI.reducerPath]: sellsAPI.reducer,
       
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(puzzlesAPI.middleware, ordersAPI.middleware, sellsAPI.middleware),
})