import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";
import { useEffect } from "react";

export default function HomeLayout() {
  return (
    <div className="home-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}
