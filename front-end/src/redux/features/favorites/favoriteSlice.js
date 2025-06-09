import { createSlice } from '@reduxjs/toolkit'
import Swal from 'sweetalert2';

const initialState = {
    favoriteItems: [],
}

const favoriteSlice = createSlice({
    name: 'favorites',
    initialState: initialState,
    reducers: {
        addToFavorites: (state, action) => {
            const existingItem = state.favoriteItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                Swal.fire({
                    title: "Puzzle-ul se află deja în lista de favorite!",
                    icon: "info",
                    showOkButton: true,
                });
            } else {
                state.favoriteItems.push({ ...action.payload, quantity: 1 })
            }
        },
        removeFromFavorites: (state, action) => {
            const existingItem = state.favoriteItems.find(item => item._id === action.payload._id);
            if (existingItem) {
                state.favoriteItems = state.favoriteItems.filter(item => item._id !== action.payload._id);
            }
        },
        clearFavorites: (state) => {
            state.favoriteItems = [];
        },
    }

})

export const { addToFavorites, removeFromFavorites, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;