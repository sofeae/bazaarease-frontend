import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { Provider } from "react-redux";

export default function RootLayout(){
    return (
        <div>
            <Navbar/>
            <Outlet className=""/>
        </div>
    )
}