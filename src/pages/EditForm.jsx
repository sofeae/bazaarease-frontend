import React from "react";
import Sidebar from "../components/SidebarA";
import { Box } from "@mui/material";
import EditForm from "../components/EditForm";

function Order() {
  return (
    <div>
      <Box sx={{ display: "flex" }}>
      </Box>
      
      <Box component="main" sx={{ flexGrow: 1, bgcolor: "#f7f7f7;", paddingLeft: 34, paddingBottom: 15}}>
        <EditForm />
      </Box>
    </div>
  );
}

export default Order;
