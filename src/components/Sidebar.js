// src/components/Sidebar.js
import React from 'react';
import { styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import BookIcon from '@mui/icons-material/Book';
import LayersIcon from '@mui/icons-material/Layers';
import PeopleIcon from '@mui/icons-material/People';
import AddIcon from '@mui/icons-material/Add';
import SettingsIcon from '@mui/icons-material/Settings';
import { List, ListItem, ListItemIcon, ListItemText, Divider, Collapse, Typography, Drawer, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const handleLogout = () => {
  // Remove token from localStorage
  localStorage.removeItem('token');

 window.location.assign('/signin');
}

// Define navigation items
const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/admin',
  },
  {
    text: 'Books',
    icon: <BookIcon />,
    children: [
      { text: 'Add Book', icon: <AddIcon />, path: '/admin/book/addBook' },
      { text: 'Books List', icon: <BookIcon />, path: '/admin/book/book' },
    ],
  },
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Staff',
  },
  {
    text: 'Users',
    icon: <PeopleIcon />,
    children: [
      { text: 'Add User', icon: <AddIcon />, path: '/admin/adduser' },
      { text: 'Users List', icon: <PeopleIcon />, path: '/admin/users' },
    ],
  },
  {
    text: 'Log Out',
    icon: <LayersIcon />,
    onClick: handleLogout,
  },
  {
    kind: 'divider',
  },
  {
    text: 'Empty',
    icon: <SettingsIcon />,
    path: '/empty',
  },
];

const SidebarContainer = styled('div')(({ theme }) => ({
  width: 250,
  backgroundColor: theme.palette.background.default,
  color: theme.palette.text.primary,
  height: '100%',
}));


const SidebarContent = () => {
  const [openItems, setOpenItems] = React.useState({});

  const handleToggle = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <SidebarContainer>
      <List>
        {NAVIGATION.map((item, index) => {
          if (item.kind === 'header') {
            return (
              <Typography key={index} variant="subtitle2" style={{ padding: '10px 16px', color: '#999' }}>
                {item.title}
              </Typography>
            );
          } else if (item.kind === 'divider') {
            return <Divider key={index} style={{ margin: '10px 0' }} />;
          } else if (item.children) {
            return (
              <React.Fragment key={index}>
                <ListItem button onClick={() => handleToggle(index)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                  {openItems[index] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openItems[index]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.children.map((child, childIndex) => (
                      <ListItem
                        button
                        key={childIndex}
                        component={Link}
                        to={child.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>{child.icon}</ListItemIcon>
                        <ListItemText primary={child.text} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          } else {
            return (
              
                <ListItem button key={index} onClick={item.onClick}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItem>
              
            );
          }
        })}
      </List>
    </SidebarContainer>
  );
};

const Sidebar = ({ open, onClose }) => {
  return (
    <Drawer open={open} onClose={onClose} variant="temporary" ModalProps={{ keepMounted: true }}>
      <SidebarContent />
    </Drawer>
  );
};

export default Sidebar;
