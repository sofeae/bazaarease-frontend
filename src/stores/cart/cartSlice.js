import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.products.push({ ...action.payload });
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
