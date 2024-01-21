import { Banner } from "./Banner.jsx";
import ProductsPreview from "./ProductsPreview.jsx";
import { useAuthContext } from "../../hooks/useAuthContext";
import React, { useEffect } from 'react';
import { useNavigate,useParams } from "react-router-dom";
import { backendBaseURL } from "../../utils/imageUrl";

const CustomerPage = () => {
  // const { user } = useAuthContext(); TABOLEH GUNA. NI UNTUK SELLER SAHAJA. CUSTOMER BUKAN SELLER. AuthContext = null kalau tk login. Customer tak login. Seller je login.
  const navigate = useNavigate();


  // So kalau user punya data tkleh dari AuthContext, nak dapat dari mne?
  // Dari api
  // getBusinessNameById, getStoreStatusById 
  // Mana pulak nk dapat ID?
  // Dapat dari URL
  // /Menu/b1jjsduajn1923/CustomerPage
  // "b1jjsduajn1923" ni ID atau Seller Punya ID

  //Get ID from URL
  const { userId } = useParams();

  //Fetch From API

  // Fetch user data and log businessName and storeStatus
  const fetchUserData = async () => {

    //fetch busienssname
    const response = await fetch(backendBaseURL+`/api/customer/business-name/${userId}`)

    const { businessName } = await response.json();

    // FETCH Store status by user ID. User id from AuthContext.
    const response2 = await fetch(backendBaseURL + `/api/user/get-store-status/${userId}`, {
    });
    const { storeStatus } = await response2.json();

    if (response2.ok && response.ok) {
      // Fetch additional user data if needed
      console.log("Business Name:", businessName);
      console.log("Store Status:", storeStatus);

      // Check if storeStatus is true, redirect to PageError
      if (storeStatus == false) {
        navigate('/PageError');
      }
    }
  };

  // Call the fetchUserData function when the component mounts
  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  return (
    <div style={{ backgroundColor: 'white' }}>
      <Banner />
      <ProductsPreview />
    </div>
  );
};

export default CustomerPage;
