import React from "react";
import Sidebar from "../components/SidebarA";
import { Box } from "@mui/material";


function Order() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Sidebar />
      </Box>
      
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", paddingLeft: 34 }}
      >
      </Box>
    </div>
  );
}

export default Order;
