import React, { useState } from 'react';
import Switch from '@mui/material/Switch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Link } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { useMenusContext } from '../hooks/useMenusContext';
import { useAuthContext } from '../hooks/useAuthContext';
import { backendBaseURL, imageURL } from '../utils/imageUrl';
import style from './MenuDetails.module.css';

const MenuDetails = ({ menu }) => {
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();

  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  const handleDelete = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(backendBaseURL + '/api/menus/' + menu._id, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_MENUS', payload: json });
    }
  };

  const handleEdit = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(backendBaseURL + '/api/menus/' + menu._id, {
      method: 'UPDATE',
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_MENUS', payload: json });
    }
  };

  const iconStyle = {
    marginRight: '8px',
    cursor: 'pointer',
    color: 'black',
  };

  return (
    <div className="flex flex-col bg-white p-3 w-full justify-center shadow-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            sx={{ '& .Mui-checked': { color: 'yellow' } }}
          />
          <h4 className="text-yellow-500 font-bold text-xl ml-2">{menu.name}</h4>
        </div>
        <span>
          <Link to={`EditForm/${menu._id}`}>
            <EditIcon style={iconStyle} />
          </Link>
          <DeleteIcon style={iconStyle} onClick={handleDelete} />
        </span>
      </div>

      <img
        src={imageURL + '/' + menu.image}
        height="250px"
        width="250px"
        alt="Menu"
        className={style.img + ' object-cover mx-auto'}
      />
      <p>
        <strong>Description: </strong>
        {menu.desc}
      </p>
      <p>
        <strong>Price: </strong>
        RM {menu.price}
      </p>

      <p>
        <strong>Added: </strong>
        {formatDistanceToNow(new Date(menu.createdAt), { addSuffix: true })}
      </p>
    </div>
  );
};

export default MenuDetails;
