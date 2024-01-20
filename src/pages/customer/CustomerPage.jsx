import { Banner } from "./Banner.jsx";
import ProductsPreview from "./ProductsPreview.jsx";
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

const CustomerPage = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();

  // Fetch user data and log businessName and storeStatus
  const fetchUserData = async () => {
    if (user) {
      // Fetch additional user data if needed
      console.log("Business Name:", user.businessName);
      console.log("Store Status:", user.storeStatus);

      // Check if storeStatus is true, redirect to PageError
      if (user.storeStatus == false) {
        navigate('/PageError');
      }
    }
  };

  // Call the fetchUserData function when the component mounts
  useEffect(() => {
    fetchUserData();
  }, [user, navigate]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Banner />
      <ProductsPreview />
    </div>
  );
};

export default CustomerPage;
