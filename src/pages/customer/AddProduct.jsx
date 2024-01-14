import Button from '@mui/material/Button';

export const AddProduct = ({ onAddProduct, quantity }) => {
  return (
    <div className="flex justify-end">
      <Button onClick={() => onAddProduct(quantity)}>
        Add Product
      </Button>
    </div>
  );
};
