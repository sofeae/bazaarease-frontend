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
  const [image, setImage] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate that the image field is not empty
    if (!image) {
      setError("Please fill in all the fields");
      setEmptyFields(["image"]);
      return;
    }
  
    const formData = new FormData();
    formData.append("name", name);
    formData.append("desc", desc);
    formData.append("price", price);
    formData.append("availability", true); // Set default availability
    formData.append("image", image);
  
    try {
      const response = await fetch(backendBaseURL + "/api/menus", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create menu");
      }
  
      const json = await response.json();
      setName("");
      setDesc("");
      setPrice("");
      setImage("");
      setError(null);
      setEmptyFields([]);
      dispatch({ type: "CREATE_MENUS", payload: json });
    } catch (error) {
      console.error("Error while submitting:", error.message);
      setError(error.message);
    }
  };

  return (
    <div className="sticky top-24">
      <form className="create" onSubmit={handleSubmit}>
        <h3 className="mt-8 mb-5 text-2xl font-bold">Add New Product</h3>

        <label className="mb-2">Menu Name:</label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          className={`mb-2 p-2 w-full ${emptyFields.includes("name") ? "error" : ""}`}
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

        {/* Hidden input for availability */}
        <input type="hidden" name="availability" value="true" />

        <label className="mb-2">Image:</label>
        <input
          type="file"
          onChange={onImageChange}
          className={`mb-2 p-2 w-full ${emptyFields.includes("image") ? "error" : ""}`}
        />
        <p className="text-sm text-gray-500">(Image must be in .png or .jpg format)</p>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded mt-6">Add Product</button>
        {error && <div className="error mt-2">{error}</div>}
      </form>
    </div>
  );
};

export default MenuForm;
