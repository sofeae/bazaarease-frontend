import { MenusContext2 } from '../context/MenusContext2'
import { useContext } from 'react'

export const useMenusContext2 = () => {
  const context2 = useContext(MenusContext2)

  if (!context2) {
    throw Error('useMenuContext2 must be used inside an MenuContext2Provider')
  }

  return context2
}