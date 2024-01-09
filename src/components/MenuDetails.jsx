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

//import dialog
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const MenuDetails = ({ menu }) => {
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();

  //product availability
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  //delete product
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

  //open confirmation dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //edit product details
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

  //icon style
  const iconStyle = {
    marginRight: '8px',
    cursor: 'pointer',
    color: 'black',
  };

  return (
    <div className="flex flex-col bg-white p-3 w-full justify-center shadow-xl rounded border border-black-400">
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
          <React.Fragment>
            <DeleteIcon style={iconStyle} onClick={handleClickOpen} />
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Delete Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to delete this product?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDelete}>Delete</Button>
              </DialogActions>
            </Dialog>
          </React.Fragment>
        </span>
      </div>

      <img
        src={imageURL + '/' + menu.image}
        height="250px"
        width="250px"
        alt="Menu"
        className={`${style.img} object-cover mx-auto mb-4 mt-4`}
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