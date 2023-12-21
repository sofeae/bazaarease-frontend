import { Outlet } from "react-router-dom";
import Sidebar from '../components/SidebarA';

export default function HomeLayout(){
    return (
        <div className="home-layout">
            <Sidebar />
            <Outlet/>
        </div>
    )
}