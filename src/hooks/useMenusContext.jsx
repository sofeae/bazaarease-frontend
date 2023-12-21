import { MenusContext } from '../context/MenusContext'
import { useContext } from 'react'

export const useMenusContext = () => {
  const context = useContext(MenusContext)

  if (!context) {
    throw Error('useMenuContext must be used inside an MenuContextProvider')
  }

  return context
}