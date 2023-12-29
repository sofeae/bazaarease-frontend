import { useMenusContext } from "../hooks/useMenusContext";
import { useAuthContext } from "../hooks/useAuthContext";
// import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import * as React from 'react';

//css
import style from "./OrderDetails.module.css";

// date fns
import { backendBaseURL, imageURL } from "../utils/imageUrl";

const OrderDetails = ({ menu }) => {
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();

  //handle edit
  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(backendBaseURL + "/api/menus/" + menu._id, {
      method: "UPDATE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "UPDATE_MENUS", payload: json });
    }
  };

  const iconStyle = {
    marginRight: "8px", // Adjust the spacing between the icon and text
    cursor: "pointer", // Add a pointer cursor to indicate interactivity
    color: "black",
  };

  const [selected, setSelected] = React.useState(false);

  return (
    <div className="flex flex-col bg-yellow p-3 w-full justify-center shadow-xl">
      <div className="flex justify-between">
        <h4 className="text-primary-color">
          {/* {menu._id}  */}
          {menu.name}
        </h4>
        <span>
          {/* Edit icon */}
          {/* <EditIcon style={iconStyle} onClick={handleEdit} /> */}
          {/* <Link to={`EditForm/${menu._id}`}>
            <EditIcon style={iconStyle} />
          </Link> */}
          <ToggleButton
            value="check"
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
          >
            <CheckIcon />
          </ToggleButton>
        </span>
      </div>

      <img
        src={imageURL + "/" + menu.image}
        height="250px"
        width="250px"
        alt="Menu"
        className={style.img + " object-cover mx-auto"}
      />
      <p>
        <strong>Quantity: </strong>
        {/* {menu.desc} */}
      </p>
      <p>
        <strong>Price: </strong>
        RM {menu.price}
      </p>
      {/* <p>
        <strong>Stock: </strong>
        {menu.stock}
      </p> */}
      {/* <p>
        <strong>Image: </strong>
      </p> */}
      {/* <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(menu.createdAt), { addSuffix: true })}
      </p> */}
    </div>
  );
};

export default OrderDetails;
