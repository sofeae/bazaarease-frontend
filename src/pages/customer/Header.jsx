import bazaar from "../../assets/images/bazaar.png";
import cartIcon from "../../assets/icons/cart.svg";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Button from "./elements/Button";
// import { useEffect, useState } from "react";

export const Header = ({ cartCount }) => {

    return (
        <nav id="header"  className="bg-white text-black border-b-2 border-black-300">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="logo-wrapper pl-4 flex items-center">
                    <Link to="/" className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
                        <img src={bazaar} alt="logo" className="w-32 h-32 object-cover"/>
                    </Link>
                </div>

                <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
                    {/* <Link to="/" className="text-xl">Home</Link> */}
                    <h1>BazaarEase</h1>
                    {/* <Link to="#about" className="text-xl">About</Link> */}
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                    <Link to="/CartPage" className="mr-4 relative">
                        <img src={cartIcon} alt="cart"/>
                        {cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">{cartCount}</div> : null}
                    </Link>
                    {/* {
                        isLoggedIn ? 
                        <Button onClick={handleLogout}>Log Out</Button> : 
                        (
                            <>
                             <Link to="/login">Log In</Link>
                             <Link to="/register">Sign Up</Link>
                            </>
                        )
                    } */}
                </div>
            </div>
        </nav>
    )
}