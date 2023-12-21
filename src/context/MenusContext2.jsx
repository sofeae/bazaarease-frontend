import { createContext, useReducer } from 'react'

export const MenusContext2 = createContext()

export const menusReducer2 = (state, action) => {
  switch (action.type) {
    case 'SET_MENUS2': 
      return {
        menus2: action.payload
      }
    case 'CREATE_MENUS2':
      return {
        menus2: [action.payload, ...state.menus]
      }
    case 'DELETE_MENUS2':
      return {
        menus2: state.menus2.filter((w) => w._id !== action.payload._id)
      }
    default:
      return state
  }
}

export const MenusContext2Provider = ({ children }) => {
  const [state, dispatch] = useReducer(menusReducer2, {
    menus2: null
  })

  return (
    <MenusContext2.Provider value={{...state, dispatch}}>
      { children }
    </MenusContext2.Provider>
  )
}