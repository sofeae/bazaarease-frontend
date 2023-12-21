import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    menus: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            return { menus: [...state.menus, {...action.payload, amount: 1}]}
        },
        clearCart: (state) => {
            return { menus: []}
        },
        incrementProductAmount: (state, action) => {
            console.log('increment');
            return { menus: state.menus.map(menu => menu.id === action.payload.id ? {...menu, amount: menu.amount + 1} : menu)}
        },
        decrementProductAmount: (state, action) => {
            return { menus: state.menus.map(menu => menu.id === action.payload.id ? {...menu, amount: menu.amount - 1} : menu)}
        }
    }
})

export const cartProducts = state => state.cart.menus

export const {  addToCart, clearCart, incrementProductAmount, decrementProductAmount } = cartSlice.actions

export default cartSlice.reducer