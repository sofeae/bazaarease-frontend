import { createContext, useReducer } from 'react'

export const OrdersContext = createContext()

export const ordersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORDERS':
      return {
        orders: action.payload
      }
    case 'CREATE_ORDERS':
      return {
        orders: [action.payload, ...state.orders]
      }
    case 'DELETE_ORDERS':
      return {
        orders: state.orders.filter((w) => w._id !== action.payload._id)
      }
    case 'UPDATE_ORDER':
      return {
        orders: state.orders.map((order) =>
          order._id === action.payload._id
            ? { ...order, status: !order.status }
            : order
        ),
      };
    default:
      return state
  }
}

export const OrdersContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ordersReducer, {
    orders: null
  })

  return (
    <OrdersContext.Provider value={{ ...state, dispatch }}>
      {children}
    </OrdersContext.Provider>
  )
}