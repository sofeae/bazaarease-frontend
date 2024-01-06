import { Outlet } from "react-router-dom"
import { Header } from "../pages/customer/Header.jsx";
import { cartProducts } from "../stores/cart/cartSlice.js";
import { useSelector } from "react-redux";

export default function CustomerLayout() {

  const productInCart = useSelector(cartProducts);

  return (
    <>
      <Header cartCount={productInCart ? productInCart.length : 0} />
      <Outlet />
    </>
  )
}