import { useState, useEffect } from "react";
import { useMenusContext } from "../../hooks/useMenusContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Switch } from '@mui/material';

// css
import style from "./Menu.module.css";
// components
import MenuDetails from "../../components/MenuDetails";
import MenuForm from "../../components/MenuForm";
import { backendBaseURL } from "../../utils/imageUrl";

const Menu = () => {
  const { menus, dispatch } = useMenusContext();
  const { user,dispatch: authDispatch } = useAuthContext();

  // Load storeStatus from localStorage or default to true
  const [storeStatus, setStoreStatus] = useState(false);

  //TEMPLATE untuk fetch data masa load page.
  //1. IMPORT useEffect
  //2. GUNA useEffect
// useEffect(()=>{

// },[])


// || STORE STATUS SECTION
// 1. RETRIEVE STORE STATUS
// 2. DISPLAY STORE STATUS IN JSX
// 3. CHANGE STORE STATUS

//1.RETRIEVE STORE STATUS: fetch storeStatus from database during load. To get latest data
useEffect(()=>{
  const fetchStoreStatus = async () => {
    // FETCH Store status by user ID. User id from AuthContext.
    const response = await fetch(backendBaseURL + `/api/user/get-store-status/${user.id}`, {
    });
    const {storeStatus} = await response.json();

    setStoreStatus(storeStatus);
  };
  fetchStoreStatus();
},[])


//3.CHANGE STORE STATUS : patch storestatus in backend
  const handleToggle = async (event) => {
    if (!user) {
      return;
    }

    // console.log("EVENT:",event.target.checked)
    try {

      const response = await fetch(backendBaseURL + `/api/user/update-store-status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({newStatus: event.target.checked}),
      });

      const {storeStatus} = await response.json(); // Get the response text for debugging
      if(response.ok){
        setStoreStatus(storeStatus);
        authDispatch({ type: "UPDATE_STORE_STATUS", payload: {storeStatus} });
      }
  }
  catch(error){

  };
}

 // -------------------------------------------------------------------------------
  // || MENU SECTION
  
  //FETCH MENUS MASA PAGE TENGAH LOADING
  useEffect(() => {
    const fetchMenus = async () => {
      const response = await fetch(backendBaseURL + "/api/menus", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_MENUS", payload: json });
      }
    };

    if (user) {
      // Log userBusinessName and user.storeStatus
      console.log("businessName:", user.businessName);
      console.log("storeStatus:", user.storeStatus);

      if (storeStatus) {
        fetchMenus();
      }
    }
  }, [dispatch, user, storeStatus]);

  const handleStore = async () => {
    if (!user) {
      return;
    }

    const newStore = !checked;

    const response = await fetch(backendBaseURL + '/api/menus/' + menu._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ availability: newAvailability }),
    });

    const json = await response.json();

    if (response.ok) {
      setChecked(newAvailability);
      dispatch({ type: 'UPDATE_MENUS', payload: json });
    }
  };


  return (
    <>
      <div className={style["menu-container"]}>
        <div className="flex flex-col w-2/5 gap-4">
          <div className="flex items-center justify-between">
            <div className="ml-4 font-bold">
              Is your store opening today?
            </div>

            <Switch
              checked={storeStatus}
              onChange={handleToggle}
              inputProps={{ 'aria-label': 'controlled' }}
              sx={{ '& .Mui-checked': { color: 'yellow' } }}
            />
          </div>
          {menus &&
            menus.map((menu) => <MenuDetails key={menu._id} menu={menu} />)}
        </div>
        <MenuForm />
      </div>
    </>
  );
}

export default Menu;
