import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//JSX
import Login from "./pages/seller/Login";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./error-page";
import SellerRoutes from "./routes/SellerRoutes";
import RequireAuth from "./components/RequireAuth";
import CustomerRoutes from "./routes/CustomerRoutes";
import Signup from "./pages/seller/Signup";
import EditProfile from "./pages/seller/EditProfile";
import PageError from "./pages/customer/PageError";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/PageError" element={<PageError />} /> {/* Move PageError outside RootLayout */}
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/Menu/:userId/*" element={<CustomerRoutes />} />
          <Route element={<RootLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/EditProfile" element={<EditProfile />} />
            <Route
              path="/seller/*"
              element={
                <RequireAuth>
                  <SellerRoutes />
                </RequireAuth>
              }
            />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
