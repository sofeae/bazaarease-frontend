import { Routes, Route } from "react-router-dom";

//JSX
import Menu from "../pages/seller/Menu";
import EditForm from "../components/EditForm";
import HomeLayout from "../layouts/HomeLayout";
import QR from "../pages/seller/QR";
import Order from "../pages/seller/Order.jsx";
import SalesManagement from "../pages/seller/SalesManagement";
import Test from "../pages/seller/Test";


export default function SellerRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route index element={<Menu />} />
        <Route path="Order" element={<Order />} />
        <Route path="QR" element={<QR />} />
        <Route path="SalesManagement" element={<SalesManagement />} />
        <Route path="editForm/:id" element={<EditForm />} />
        <Route path="Test" element={<Test />} />
      </Route>
    </Routes>
  );
}
