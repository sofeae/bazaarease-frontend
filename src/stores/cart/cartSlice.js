import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.products.push({ ...action.payload, amount: 1 });
        },
        clearCart: (state) => {
            state.products = [];
        },
        incrementProductAmount: (state, action) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload.id);
            if (productIndex !== -1) {
                state.products[productIndex].amount += 1;
            }
        },
        decrementProductAmount: (state, action) => {
            const productIndex = state.products.findIndex(product => product.id === action.payload.id);
            if (productIndex !== -1 && state.products[productIndex].amount > 0) {
                state.products[productIndex].amount -= 1;
            }
        }
    }
});

export const cartProducts = state => state.cart.products;

export const { addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions;

export default cartSlice.reducer;
