import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//JSX
import Login from "./pages/seller/Login";
import RootLayout from "./layouts/RootLayout";
import ErrorPage from "./error-page";
import SellerRoutes from "./routes/SellerRoutes";
import RequireAuth from "./components/RequireAuth";
import CustomerRoutes from "./routes/CustomerRoutes";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/Menu/:userId/*" element={<CustomerRoutes />} />

          <Route element={<RootLayout />}>
            <Route path="/login" element={<Login />} />
            <Route
              path="/seller/*"
              element={
                <RequireAuth>
                  <SellerRoutes />
                </RequireAuth>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

// {/* <BrowserRouter>
//   <Navbar />
//   <Routes>
//     <Route
//       path="/login"
//       element={!user ? <Login /> : <Navigate to="/" />}
//     ></Route>
//     <Route
//       path="/signup"
//       element={!user ? <Signup /> : <Navigate to="/" />}
//     ></Route>
//     <Route
//       path="/"
//       element={user ? <HomeLayout /> : <Navigate to="/login" />}
//     >
//       <Route
//         index
//         element={user ? <Menu /> : <Navigate to="/login" />}
//       ></Route>
//       <Route
//         path="QR"
//         element={user ? <QR /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="Order"
//         element={user ? <Order /> : <Navigate to="/login" />}
//       />

//       <Route
//         path="EditForm"
//         element={user ? <EditForm /> : <Navigate to="/login" />}
//       />
//       <Route
//         path="Customer"
//         element={user ? <Sales /> : <Navigate to="/login" />}
//       />
//       {/* <Route
//         path="Cart"
//         element={user ? <Cart /> : <Navigate to="/login" />}
//       /> */}
//       </Route>
//       </Routes>
//     </BrowserRouter>
