import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { useEffect } from "react";

export default function HomeLayout() {
  // const currentLocation = useLocation();
  // const nav = useNavigate();

  // useEffect(() => {
  //   if (currentLocation.pathname === "/seller") {
  //     nav("/seller/Menu");
  //   }
  // });

  return (
    <div className="home-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
