import { useMenusContext } from "../hooks/useMenusContext";
import { useAuthContext } from "../hooks/useAuthContext";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

//css
import style from "./MenuDetails.module.css";

// date fns
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const MenuDetails = ({ menu }) => {
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();

  // handle delete
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://bazaarease-backend.onrender.com/api/menus/" + menu._id,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_MENUS", payload: json });
    }
  };

  //handle edit
  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      "https://bazaarease-backend.onrender.com/api/menus/" + menu._id,
      {
        method: "UPDATE",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
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

  return (
    <div className="flex flex-col bg-white p-3 w-full justify-center shadow-xl">
      <div className="flex justify-between">
        <h4 className="text-primary-color">
          {/* {menu._id}  */}
          {menu.name}
        </h4>
        <span>
          {/* Edit icon */}
          {/* <EditIcon style={iconStyle} onClick={handleEdit} /> */}
          <Link to={`EditForm/${menu._id}`}>
            <EditIcon style={iconStyle} />
          </Link>
          {/* Delete icon */}
          <DeleteIcon style={iconStyle} onClick={handleDelete} />
        </span>
      </div>

      <img
        src={"http://localhost:4000/" + menu.image}
        height="250px"
        width="250px"
        alt="Menu"
        className={style.img + " object-cover mx-auto"}
      />
      <p>
        <strong>Description: </strong>
        {menu.desc}
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

      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(menu.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default MenuDetails;
