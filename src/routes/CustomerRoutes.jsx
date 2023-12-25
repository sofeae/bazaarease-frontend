import { Routes, Route } from "react-router-dom";

//JSX
import CustomerPage from "../pages/customer/CustomerPage";
import CustomerLayout from "../layouts/CustomerLayout";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<CustomerLayout />}> {/*Wrap Layout- Elok tukar jadi customerLayout */}
        <Route path="CustomerPage" element={<CustomerPage />} />
        <Route path="Cart" element={<><h1>Shopping Cart</h1></>}/>
        <Route path="something" element={<><h1>something</h1></>}/>
      </Route>
    </Routes>
  );
}
