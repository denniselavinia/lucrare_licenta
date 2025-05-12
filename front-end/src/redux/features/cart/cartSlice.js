import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromCart: (state, action) => {
            const existingItem = state.cartItems.find(item => item._id === action.payload._id);
            if (existingItem) {

                state.cartItems = state.cartItems.filter(item => item._id !== action.payload._id);

            }
        },
        clearCart: (state) => {
            state.cartItems = [];
        },
        increaseQuantity: (state, action) => {
            const item = state.cartItems.find(p => p._id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQuantity: (state, action) => {
            const item = state.cartItems.find(p => p._id === action.payload);
            if (item && item.quantity >= 1) {
                item.quantity -= 1;
            }
        },
    }

})

export const { addToCart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;