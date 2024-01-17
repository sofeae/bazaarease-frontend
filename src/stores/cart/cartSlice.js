import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productToAdd = { ...action.payload, totalPrice: action.payload.price * action.payload.amount };
      state.products.push(productToAdd);
    },
    clearCart: (state) => {
      state.products = [];
    },
    incrementProductAmount: (state, action) => {
      const { id, index } = action.payload;
      const productIndex =
        index !== -1
          ? index
          : state.products.findIndex((item) => item.id === id);

      if (productIndex !== -1) {
        state.products[productIndex].amount += 1;
        state.products[productIndex].totalPrice = state.products[productIndex].amount * state.products[productIndex].price;
      }
    },
    decrementProductAmount: (state, action) => {
      const { id, index } = action.payload;
      const productIndex =
        index !== -1
          ? index
          : state.products.findIndex((item) => item.id === id);

      if (productIndex !== -1 && state.products[productIndex].amount > 0) {
        state.products[productIndex].amount -= 1;
        state.products[productIndex].totalPrice = state.products[productIndex].amount * state.products[productIndex].price;
      }
    },
  },
});

export const cartProducts = (state) => state.cart.products;

export const {
  addToCart,
  clearCart,
  incrementProductAmount,
  decrementProductAmount,
} = cartSlice.actions;

export default cartSlice.reducer;
