import { Routes, Route } from "react-router-dom";

//JSX
import Menu from "../pages/Menu";
import EditForm from "../components/EditForm";
import HomeLayout from "../layouts/HomeLayout";
import QR from "../pages/QR";
import Order from "../pages/Order";

export default function SellerRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Menu />} />
        <Route path="Order" element={<Order />} />
        <Route path="QR" element={<QR />} />
        <Route path="editForm/:id" element={<EditForm />} />
      </Route>
    </Routes>
  );
}
