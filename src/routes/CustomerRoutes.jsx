import { Routes, Route } from "react-router-dom";

//JSX
import CustomerPage from "../pages/customer/CustomerPage";

export default function CustomerRoutes() {
  return (
    <Routes>
      <Route element={<HomeLayout />}>
        <Route path="CustomerPage" element={<CustomerPage />} />
      </Route>
    </Routes>
  );
}
