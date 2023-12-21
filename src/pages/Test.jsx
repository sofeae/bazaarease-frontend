import React from "react";
import Sidebar from "../components/SidebarA";
import { Box } from "@mui/material";
//import Header from "../components/Header"
import CustMenuList from "../components/CustMenuList"

function Order() {
  return (
    <div>
    {/* <Header /> */}
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 34 }}
      >     
      <div className="suggestion-page">
          <h3>Suggested Course</h3>
          <CustMenuList/>
        </div>
      </Box>

    </div>
  );
}

export default Order;
