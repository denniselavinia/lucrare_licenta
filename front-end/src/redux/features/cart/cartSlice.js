import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";
import Swal from "sweetalert2";

const cartFromStorage = localStorage.getItem("cart");
let parsedCart = [];
try {
	if (cartFromStorage && cartFromStorage !== "undefined") {
		parsedCart = JSON.parse(cartFromStorage);
		if (!Array.isArray(parsedCart)) parsedCart = [];
	}
} catch {
	parsedCart = [];
}

const initialState = {
	cartItems: parsedCart,
};

const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		addToCart: (state, action) => {
			const existingItem = state.cartItems.find(
				(item) => item._id === action.payload._id
			);
			if (existingItem) {
				Swal.fire({
					title:
						"Puzzle-ul este deja în coș.\nNu se poate introduce mai mult de o bucată din fiecare tip de puzzle!",
					icon: "info",
					showConfirmButton: true,
				});
			} else {
				state.cartItems.push({ ...action.payload, quantity: 1 });
			}
		},
		removeFromCart: (state, action) => {
			const existingItem = state.cartItems.find(
				(item) => item._id === action.payload._id
			);
			if (existingItem) {
				state.cartItems = state.cartItems.filter(
					(item) => item._id !== action.payload._id
				);
			}
		},
		clearCart: (state) => {
			state.cartItems = [];
		},
	},
});

export const {
	addToCart,
	removeFromCart,
	clearCart,
	increaseQuantity,
	decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
