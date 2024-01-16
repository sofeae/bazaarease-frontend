import { imageURL } from "../../utils/imageUrl";
import { AddProduct } from "./AddProduct";
import style from "./ProductPreviewCard.module.css";

// import dialog
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import ChooseQuantity from "./ChooseQuantity.jsx";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  const [quantity, setQuantity] = React.useState(1); 

  const handleQuantityChange = (value) => {
    setQuantity(value);
  };

  const addProduct = () => {
    const updatedProduct = {
      ...product,
      amount: {
        ...product.amount,
        chosenQuantity: quantity,
      },
    };

    onAddProduct(updatedProduct); // Pass the updated product to the onAddProduct function
    setQuantity(1); // Reset the selected quantity to 1 after adding the product
    handleClose();
  };

  // open confirmation dialog
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div
      className="w-full p-4 m-2 rounded text-white bg-black text-center flex flex-col justify-between overflow-hidden"
      style={{ backgroundColor: "black" }}
    >
      <div className="flex items-center justify-center mb-4">
        <img
          src={imageURL + "/" + product.image}
          alt={product.name}
          className="w-40 h-40 object-cover rounded"
        />
      </div>
      <h1 className="text-lg">{product.name}</h1>
      <h2 className="pb-2 text-lg">RM {product.price}</h2>
      <p className={style.scrollbar + " " + 'text-sm mb-2 h-20 overflow-y-auto line-clamp-4 hide-scrollbar'}>
        {product.desc}
      </p>
      <div className="flex justify-end mt-2">
        <React.Fragment>
          <AddCircleOutlinedIcon
            className="mr-2 cursor-pointer text-yellow-500"
            onClick={handleClickOpen}
          />
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle align="center" id="alert-dialog-title">
              {"Add Product to Cart"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText align="center" id="alert-dialog-description">
                Choose Quantity
              </DialogContentText>
              <ChooseQuantity onChange={handleQuantityChange} />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <AddProduct onAddProduct={addProduct} />
            </DialogActions>
          </Dialog>
        </React.Fragment>
      </div>
    </div>
  );
};


