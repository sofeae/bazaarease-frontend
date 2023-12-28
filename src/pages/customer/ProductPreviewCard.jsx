import { imageURL } from "../../utils/imageUrl";
import { AddProduct } from "./AddProduct";

export const ProductPreviewCard = ({ product, onAddProduct }) => {
  
  const addProduct = () => {
    onAddProduct(product);
  };

  return (
    <div
      className="w-full p-4 m-2 rounded text-white bg-black text-center"
      style={{ backgroundColor: "black" }}
    >
      <img src={imageURL + "/" + product.image} alt={product.name} style={{ width: '200px', height: 'auto' }}/>
      <h1 className="text-lg">{product.name}</h1>
      <h2 className="pb-2 text-lg">RM {product.price}</h2>
      <p className="text-sm mb-2 h-20 line-clamp-4">{product.desc}</p>
      <AddProduct onAddProduct={addProduct} />
    </div>
  );
};
 