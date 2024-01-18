import { Routes, Route } from "react-router-dom";

//JSX
import CustomerPage from "../pages/customer/CustomerPage";
import CartPage from "../pages/customer/CartPage";
import CustomerLayout from "../layouts/CustomerLayout";
import PaymentSuccessPage  from "../pages/customer/PaymentSuccessPage";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="CustomerPage" element={<CustomerPage />} />
        <Route path="Cart" element={<CartPage />}/>
        <Route path="Cart/payment-success" element={<PaymentSuccessPage />}/>

      </Route>
    </Routes> 
  );
}
