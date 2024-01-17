import bazaar from "../../assets/images/bazaar.png";
import cartIcon from "../../assets/icons/cart.svg";
import { Link, useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import Button from "./elements/Button";
// import { useEffect, useState } from "react";

export const Header = ({ cartCount }) => {
  const { userId } = useParams();

  return (
    <nav id="header" className="bg-white text-black border-b-2 border-black-300">
      <div className="w-full container mx-auto flex items-center justify-between mt-3 mb-3 py-2">
        <div className="logo-wrapper pl-4 flex items-center">
          <Link to={`/menu/${userId}/CustomerPage`} className="toggleColor text-white no-underline hover:no-underline font-bold text-2xl lg:text-4xl">
            {/* <img src={bazaar} alt="logo" className="w-32 h-32 object-cover" /> */}
            <h1 className="text-3xl font-bold ml-4 text-black">BazaarEase</h1>
          </Link>
          {/* <h1 className="text-3xl font-bold ml-4">BazaarEase</h1> */}
        </div>
        <div className="flex items-center justify-center space-x-4">
          <Link to="Cart" className="mr-4 relative">
            <img src={cartIcon} alt="cart" />
            {cartCount > 0 ? <div className="rounded-full bg-yellow-400 text-white inline-flex justify-center items-center w-full absolute -top-1 -right-1">{cartCount}</div> : null}
          </Link>
        </div>
      </div>
    </nav>
  );
}