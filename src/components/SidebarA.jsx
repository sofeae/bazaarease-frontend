import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import QrCodeIcon from '@mui/icons-material/QrCode';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Drawer } from '@mui/material';

export default function PermanentDrawerLeft() {
  const items = [
    { text: 'Menu', icon: <RestaurantIcon />, link: '/' },
    { text: 'Order', icon: <BorderColorIcon />, link: '/Order' },
    { text: 'QR Code', icon: <QrCodeIcon />, link: '/QR' },
    { text: 'Sales Management', icon: <AttachMoneyIcon />, link: '/Order' },
    { text: 'editForm', icon: <AttachMoneyIcon />, link: '/EditForm' },
    { text: 'test test', icon: <AttachMoneyIcon />, link: '/Test' },
    { text: 'customer side', icon: <AttachMoneyIcon />, link: '/Customer' },
  ];
const drawerWidth = 240;

  return (
    // <div className='sidebar'>
      <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >

        <Box sx={{ flexGrow: 1, marginTop: "30%"}}>
          <List>
            {items.map((item) => (
              <ListItem key={item.text} disablePadding>
                <ListItemButton className="list-item" component={Link} to={item.link}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>

          <List>
            <ListItem disablePadding>
              <ListItemButton className="list-item">
              </ListItemButton>
            </ListItem>
          </List>
        </Drawer>

      </Box>
    // </div>
  );
}
