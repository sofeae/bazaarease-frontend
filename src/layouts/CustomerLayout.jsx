import { Outlet } from "react-router-dom"

export default function CustomerLayout() {
  return (
    <>
    <div>Header</div>
    <Outlet />
    <div>Footer</div>
    </>
  )
}