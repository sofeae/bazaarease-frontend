import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Menu from './pages/Menu';
import Menu2 from './pages/Menu2';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import CustNavbar from './components/CustNavbar';
import QR from './pages/QR';
import Order from './pages/Order';
import Sales from './pages/Customer';
import EditForm from './pages/EditForm';
import Cart from './pages/Cart';
import HomeLayout from './layouts/HomeLayout';
import RootLayout from './layouts/RootLayout'
import Test from './pages/Test';
//import Template from './pages/Template';
//import Sidebar from '../components/Sidebar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />}></Route>
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />}></Route>
          <Route path="/" element={user ? <HomeLayout /> : <Navigate to="/login" />}>
            <Route index element={user ? <Menu /> : <Navigate to="/login" />}></Route>
            <Route path="QR"
              element={user ? <QR /> : <Navigate to="/login" />}
            />
            <Route path="Order"
              element={user ? <Order /> : <Navigate to="/login" />}
            />

            <Route path="EditForm"
              element={user ? <EditForm /> : <Navigate to="/login" />} 
            />
            <Route path="Customer"
              element={user ? <Sales /> : <Navigate to="/login" />}
            />
            <Route path="Cart"
              element={user ? <Cart /> : <Navigate to="/login" />}
            />
          </Route>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
