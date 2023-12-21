import { useMenusContext2 } from '../hooks/useMenusContext2';
import { useAuthContext } from '../hooks/useAuthContext';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const MenuDetails2 = ({ menu2 }) => {
  const { dispatch } = useMenusContext2();
  const { user } = useAuthContext();

  // handle delete
  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/menus2/' + menu2._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_MENUS2', payload: json });
    }
  };

  //handle edit
  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const response = await fetch('/api/menus2/' + menu2._id, {
      method: 'UPDATE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_MENUS2', payload: json });
    }
  };

  const iconStyle = {
    marginRight: '8px', // Adjust the spacing between the icon and text
    cursor: 'pointer', // Add a pointer cursor to indicate interactivity
    color: 'black',
  };

  return (
    <div className="menus-details">
      <h4>{menu2.name}</h4>
      <p>
        <img src={'http://localhost:4000/' + menu2.image} height="220" width="353" alt="Menu" />
      </p>
      <p>
        <strong>Description: </strong>
        {menu2.desc}
      </p>
      <p>
        <strong>Price (in RM): </strong>
        {menu2.price}
      </p>
      {/* <p>
        <strong>Stock: </strong>
        {menu.stock}
      </p> */}
      {/* <p>
        <strong>Image: </strong>
      </p> */}
      
      <p>{formatDistanceToNow(new Date(menu2.createdAt), { addSuffix: true })}</p>
      <span>
        {/* Edit icon */}
        {/* <EditIcon style={iconStyle} onClick={handleEdit} /> */}
        <Link to="EditForm">
          <EditIcon style={iconStyle}/>
        </Link>
        {/* Delete icon */}
        <DeleteIcon style={iconStyle} onClick={handleDelete} />
      </span>
    </div>
  );
};

export default MenuDetails2;
