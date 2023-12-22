import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CustomerPage() {
  const { userId } = useParams();
  const [menus, setMenus] = useState([]);

  async function loadData() {
    const response = await fetch(
      `https://bazaarease-backend.onrender.com/api/customer/${userId}`
    );
    const json = await response.json();
    setMenus(json);
    console.log(json);
    console.log(menus);
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div>
      Menu
      {menus.map((menu) => {
        return (
          <div>
            <h1>Title: {menu.name}</h1>
            <p>Description {menu.desc}</p>
            <p>Price RM{menu.price}</p>
            <img
              className="object-cover"
              width="250px"
              height="250px"
              src={`http://localhost:4000/${menu.image}`}
            ></img>
          </div>
        );
      })}
    </div>
  );
}
