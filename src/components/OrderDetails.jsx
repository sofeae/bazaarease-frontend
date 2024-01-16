import React from 'react';
import { useOrdersContext } from "../hooks/useOrdersContext";
import ToggleButton from '@mui/material/ToggleButton';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const OrderDetails = ({ orders, handleToggle }) => {
  const { dispatch } = useOrdersContext();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = () => {
    // Toggle the order status and update it in the context
    const updatedOrder = { ...orders, status: !orders.status };
    dispatch({ type: "UPDATE_ORDER", payload: updatedOrder });
  };

  return (
    <div className="flex flex-col p-3 w-full justify-center shadow-xl border border-yellow-500 rounded">
      <div className="flex justify-between">
        <React.Fragment>
          <h4 className="text-yellow-500 font-bold text-2xl mb-2" onClick={handleClickOpen}>
            #{orders.queueNum}
          </h4>
          <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
            maxWidth="sm"
            fullWidth
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
                      {/* Display the quantity */}
                      {item.quantity}
                    </p>
                    {index < orders.cart.length - 1 ? <br /> : ''}
                  </span>
                ))}
              </Typography>
            </DialogContent>
          </BootstrapDialog>
        </React.Fragment>
        <span>
          <ToggleButton
            value="check"
            selected={orders.status}
            onChange={handleChange}
            style={{ padding: '4px', width: '24px', height: '24px' }}
          >
            <CheckIcon style={{ fontSize: '20px' }} />
          </ToggleButton>
        </span>
      </div>
      <p>
        <strong>Total Quantity: </strong>
        {orders.cart.length}
      </p>
      <p>
        <strong>Status: </strong>
        {orders.status ? 'Completed' : 'Incomplete'}
      </p>
    </div>
  );
};

export default OrderDetails;
