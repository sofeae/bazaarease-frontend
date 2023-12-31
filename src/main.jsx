import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import { MenusContextProvider } from "./context/MenusContext.jsx";
import { OrdersContextProvider } from "./context/OrdersContext.jsx";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material";
import { Provider } from "react-redux";
import store from "././stores/rootStore.js";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <MenusContextProvider>
        <OrdersContextProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
      </OrdersContextProvider>
      </MenusContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
