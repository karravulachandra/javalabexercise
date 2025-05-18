import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Collapse,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  ExpandLess,
  ExpandMore,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Notifications as NotificationsIcon,
  Message as MessageIcon,
  Bookmark as BookmarkIcon,
  Assessment as AssessmentIcon
} from '@mui/icons-material';

const drawerWidth = 260;

const Sidebar = ({ open, toggleSidebar }) => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [openSubmenu, setOpenSubmenu] = useState({
    jobs: false,
    settings: false
  });

  const handleSubmenuClick = (submenu) => {
    setOpenSubmenu({
      ...openSubmenu,
      [submenu]: !openSubmenu[submenu]
    });
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const mainMenuItems = [
    {
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardIcon />
    },
    {
      title: 'Jobs',
      path: '/jobs',
      icon: <WorkIcon />,
      submenu: true,
      submenuItems: [
        { title: 'Browse Jobs', path: '/jobs' },
        { title: 'Saved Jobs', path: '/jobs/saved' },
        { title: 'Applied Jobs', path: '/jobs/applied' },
      ]
    },
    {
      title: 'Companies',
      path: '/companies',
      icon: <BusinessIcon />
    },
    {
      title: 'Messages',
      path: '/messages',
      icon: <MessageIcon />
    },
    {
      title: 'Notifications',
      path: '/notifications',
      icon: <NotificationsIcon />
    },
  ];

  const secondaryMenuItems = [
    {
      title: 'Profile',
      path: '/profile',
      icon: <PersonIcon />
    },
    {
      title: 'Settings',
      path: '/settings',
      icon: <SettingsIcon />,
      submenu: true,
      submenuItems: [
        { title: 'Account', path: '/settings/account' },
        { title: 'Privacy', path: '/settings/privacy' },
        { title: 'Notifications', path: '/settings/notifications' },
      ]
    },
    {
      title: 'Help & Support',
      path: '/help',
      icon: <HelpIcon />
    },
  ];

  const drawer = (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 2,
        borderBottom: '1px solid #eee'
      }}>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          TopHire
        </Typography>
        {!isMobile && (
          <IconButton onClick={toggleSidebar}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        )}
      </Box>

      <Box sx={{ overflow: 'auto', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <List component="nav" sx={{ p: 1, flexGrow: 1 }}>
          {mainMenuItems.map((item) => (
            <Box key={item.title}>
              <ListItem
                button
                component={item.submenu ? 'div' : Link}
                to={item.submenu ? undefined : item.path}
                onClick={item.submenu ? () => handleSubmenuClick(item.title.toLowerCase()) : undefined}
                selected={!item.submenu && isActive(item.path)}
                sx={{
                  borderRadius: '8px',
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.50',
                    '&:hover': {
                      backgroundColor: 'primary.100',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 40,
                  color: isActive(item.path) ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 'bold' : 'medium',
                    fontSize: '0.9rem',
                    color: isActive(item.path) ? 'primary.main' : 'inherit'
                  }}
                />
                {item.submenu && (
                  openSubmenu[item.title.toLowerCase()] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItem>

              {item.submenu && (
                <Collapse in={openSubmenu[item.title.toLowerCase()]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenuItems.map((subItem) => (
                      <ListItem
                        key={subItem.title}
                        button
                        component={Link}
                        to={subItem.path}
                        selected={isActive(subItem.path)}
                        sx={{
                          pl: 7,
                          borderRadius: '8px',
                          mb: 0.5,
                          '&.Mui-selected': {
                            backgroundColor: 'primary.50',
                            '&:hover': {
                              backgroundColor: 'primary.100',
                            },
                          },
                        }}
                      >
                        <ListItemText
                          primary={subItem.title}
                          primaryTypographyProps={{
                            fontWeight: isActive(subItem.path) ? 'bold' : 'regular',
                            fontSize: '0.85rem',
                            color: isActive(subItem.path) ? 'primary.main' : 'inherit'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>

        <Divider />

        <List component="nav" sx={{ p: 1 }}>
          {secondaryMenuItems.map((item) => (
            <Box key={item.title}>
              <ListItem
                button
                component={item.submenu ? 'div' : Link}
                to={item.submenu ? undefined : item.path}
                onClick={item.submenu ? () => handleSubmenuClick(item.title.toLowerCase()) : undefined}
                selected={!item.submenu && isActive(item.path)}
                sx={{
                  borderRadius: '8px',
                  mb: 0.5,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.50',
                    '&:hover': {
                      backgroundColor: 'primary.100',
                    },
                  },
                }}
              >
                <ListItemIcon sx={{
                  minWidth: 40,
                  color: isActive(item.path) ? 'primary.main' : 'inherit'
                }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  primaryTypographyProps={{
                    fontWeight: isActive(item.path) ? 'bold' : 'medium',
                    fontSize: '0.9rem',
                    color: isActive(item.path) ? 'primary.main' : 'inherit'
                  }}
                />
                {item.submenu && (
                  openSubmenu[item.title.toLowerCase()] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItem>

              {item.submenu && (
                <Collapse in={openSubmenu[item.title.toLowerCase()]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.submenuItems.map((subItem) => (
                      <ListItem
                        key={subItem.title}
                        button
                        component={Link}
                        to={subItem.path}
                        selected={isActive(subItem.path)}
                        sx={{
                          pl: 7,
                          borderRadius: '8px',
                          mb: 0.5,
                          '&.Mui-selected': {
                            backgroundColor: 'primary.50',
                            '&:hover': {
                              backgroundColor: 'primary.100',
                            },
                          },
                        }}
                      >
                        <ListItemText
                          primary={subItem.title}
                          primaryTypographyProps={{
                            fontWeight: isActive(subItem.path) ? 'bold' : 'regular',
                            fontSize: '0.85rem',
                            color: isActive(subItem.path) ? 'primary.main' : 'inherit'
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </Box>
          ))}
        </List>
      </Box>
    </>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { md: open ? drawerWidth : 0 }, flexShrink: { md: 0 } }}
    >
      {/* Mobile drawer */}
      {isMobile ? (
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleSidebar}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              boxShadow: 3
            },
          }}
        >
          {drawer}
        </Drawer>
      ) : (
        /* Desktop drawer */
        <Drawer
          variant="permanent"
          open={open}
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              position: 'relative',
              height: '100%',
              border: 'none'
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
    </Box>
  );
};

export default Sidebar;
