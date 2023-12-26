import { Outlet } from "react-router-dom"
import { Header } from "../pages/customer/Header.jsx";

export default function CustomerLayout() {
  return (
    <>
    <Header />
    <Outlet />
    <div>Footer</div>
    </>
  )
}