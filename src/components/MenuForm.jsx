import { useState } from "react";
import { useMenusContext } from "../hooks/useMenusContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { backendBaseURL } from "../utils/imageUrl";

const MenuForm = () => {
  const { dispatch } = useMenusContext();
  const { user } = useAuthContext();

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  //const [stock, setStock] = useState('')
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  //Ubahsuai
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    //formData.append("stock", stock);
    formData.append("image", image);

    const response = await fetch(backendBaseURL + "/api/menus", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setDesc("");
      setPrice("");
      //setStock('')
      setImage("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_MENUS", payload: json });
    }
    //End from old
  };

  return (
    <div className="sticky top-24">
      <form className="create " onSubmit={handleSubmit}>
      <h3 className="mb-4 text-2xl font-bold">Add New Product</h3>
  
        <label className="mb-2">Menu Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={`mb-2 p-2 w-full ${emptyFields.includes("title") ? "error" : ""}`}
        />
  
        <label className="mb-2">Description:</label>
        <input
          type="text"
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          className={`mb-2 p-2 w-full ${emptyFields.includes("desc") ? "error" : ""}`}
        />
  
        <label className="mb-2">Price:</label>
        <input
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          value={price}
          className={`mb-2 p-2 w-full ${emptyFields.includes("price") ? "error" : ""}`}
        />
  
        <label className="mb-2">Image:</label>
        <input
          type="file"
          onChange={onImageChange}
          className={`mb-2 p-2 w-full ${emptyFields.includes("image") ? "error" : ""}`}
        />
  
        <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-6">Add Product</button>
        {error && <div className="error mt-2">{error}</div>}
      </form>
    </div>
  );  
};

export default MenuForm;
