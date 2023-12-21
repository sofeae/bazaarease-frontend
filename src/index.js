import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { MenusContextProvider } from './context/MenusContext'

import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <MenusContextProvider>
        <App />
    </MenusContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

