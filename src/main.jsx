import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MenusContextProvider } from "./context/MenusContext.jsx";
import App from "./App.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MenusContextProvider>
        <App />
      </MenusContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
