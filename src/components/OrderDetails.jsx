import { useMenusContext } from "../hooks/useMenusContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useOrdersContext } from "../hooks/useOrdersContext";
// import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import ToggleButton from '@mui/material/ToggleButton';
import * as React from 'react';

//dialog
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

// date fns
import { backendBaseURL, imageURL } from "../utils/imageUrl";

//dialog
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const OrderDetails = ({ orders }) => {
  const { dispatch } = useOrdersContext();
  const [selected, setSelected] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // if (!orders) {
  //   return <p>Loading...</p>; // or any loading indicator
  // }

  // const { user } = useAuthContext();

  //handle edit
  // const handleEdit = async () => {
  //   if (!user) {
  //     return;
  //   }

  //   const response = await fetch(backendBaseURL + "/api/menus/" + menu._id, {
  //     method: "UPDATE",
  //     headers: {
  //       Authorization: `Bearer ${user.token}`,
  //     },
  //   });
  //   const json = await response.json();

  //   if (response.ok) {
  //     dispatch({ type: "UPDATE_MENUS", payload: json });
  //   }
  // };

  const iconStyle = {
    marginRight: "8px", // Adjust the spacing between the icon and text
    cursor: "pointer", // Add a pointer cursor to indicate interactivity
    color: "black",
  };

  return (
    <div className="flex flex-col bg-yellow p-3 w-full justify-center shadow-xl">
      <div className="flex justify-between">
        <React.Fragment>
          <h4 className="text-yellow-500 font-bold text-2xl mb-2" onClick={handleClickOpen}>
            #{orders.queueNum}
          </h4>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm" // Set the maximum width
            fullWidth // Use full width
          >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
              Order Details #{orders.queueNum}
            </DialogTitle>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
            <DialogContent dividers>
              <Typography gutterBottom>
                {orders.cart.map((item, index) => (
                  <span key={index}>
                    <p>
                      <strong>{index + 1}. </strong>
                      {item.name}
                    </p>
                    <p>
                      <strong>Quantity: </strong>
                      {/* {item.desc} */}
                    </p>
                    {index < orders.cart.length - 1 ? <br /> : ''}
                  </span>
                ))}
              </Typography>
            </DialogContent>
            {/* <DialogActions>
              <Button autoFocus onClick={handleClose}>
                Save changes
              </Button>
            </DialogActions> */}
          </BootstrapDialog>

        </React.Fragment>
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
            style={{ padding: '4px', width: '24px', height: '24px' }}
          >
            <CheckIcon style={{ fontSize: '20px' }} />
          </ToggleButton>
        </span>
      </div>
      <p>
        <strong>Total Quantity: </strong>
        {orders.cart.length}
        {/* Quantity: 
        <strong>{orders.cart.length}</strong> */}
      </p>
      <p>
        <strong>Status: </strong>
        {orders.status}
      </p>
    </div >
  );
};

export default OrderDetails;