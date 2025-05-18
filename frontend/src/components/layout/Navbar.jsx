import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Notifications as NotificationsIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon
} from '@mui/icons-material';

const Navbar = () => {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const navItems = [
    { title: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { title: 'Jobs', path: '/jobs', icon: <WorkIcon /> },
    { title: 'Companies', path: '/companies', icon: <BusinessIcon /> },
    { title: 'Profile', path: '/profile', icon: <PersonIcon /> },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      sx={{ mt: 1 }}
    >
      <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem component={Link} to="/settings" onClick={handleMenuClose}>Settings</MenuItem>
      <Divider />
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const renderNotificationMenu = (
    <Menu
      anchorEl={notificationAnchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationMenuOpen}
      onClose={handleNotificationMenuClose}
      sx={{ mt: 1, width: 320, maxWidth: '100%' }}
    >
      <Box sx={{ p: 2, borderBottom: '1px solid #eee' }}>
        <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
      </Box>
      <MenuItem onClick={handleNotificationMenuClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography variant="body2" fontWeight="bold">Your application was viewed</Typography>
          <Typography variant="caption" color="text.secondary">Google • 2 hours ago</Typography>
        </Box>
      </MenuItem>
      <MenuItem onClick={handleNotificationMenuClose}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          <Typography variant="body2" fontWeight="bold">Interview invitation</Typography>
          <Typography variant="caption" color="text.secondary">Microsoft • 1 day ago</Typography>
        </Box>
      </MenuItem>
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Button size="small" endIcon={<ChevronRightIcon />}>
          View all notifications
        </Button>
      </Box>
    </Menu>
  );

  const drawer = (
    <Box onClick={toggleDrawer(false)} sx={{ width: 250 }} role="presentation">
      <Box sx={{ p: 2, borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center' }}>
        <Typography variant="h6" component="div" sx={{
          flexGrow: 1,
          color: 'primary.main',
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          TopHire
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItem
            button
            key={item.title}
            component={Link}
            to={item.path}
            selected={isActive(item.path)}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.50',
                borderRight: '3px solid',
                borderColor: 'primary.main',
                '&:hover': {
                  backgroundColor: 'primary.100',
                },
              },
            }}
          >
            <Box sx={{ mr: 2, color: isActive(item.path) ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </Box>
            <ListItemText
              primary={item.title}
              primaryTypographyProps={{
                fontWeight: isActive(item.path) ? 'bold' : 'regular',
                color: isActive(item.path) ? 'primary.main' : 'inherit'
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar position="fixed" color="default" elevation={0} sx={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Typography variant="h6" component={Link} to="/" sx={{
            flexGrow: 1,
            textDecoration: 'none',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            TopHire
          </Typography>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.title}
                  component={Link}
                  to={item.path}
                  color={isActive(item.path) ? 'primary' : 'inherit'}
                  sx={{
                    mx: 1,
                    fontWeight: isActive(item.path) ? 'bold' : 'medium',
                    '&:hover': { backgroundColor: 'primary.50' }
                  }}
                  startIcon={item.icon}
                >
                  {item.title}
                </Button>
              ))}
            </Box>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" onClick={handleNotificationMenuOpen}>
              <NotificationsIcon />
            </IconButton>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                ml: 2,
                cursor: 'pointer',
                '&:hover': { opacity: 0.8 }
              }}
              onClick={handleProfileMenuOpen}
            >
              <Avatar
                src="/path-to-avatar.jpg"
                alt="User Avatar"
                sx={{ width: 32, height: 32 }}
              />
              {!isMobile && (
                <>
                  <Typography variant="body2" sx={{ ml: 1, fontWeight: 'medium' }}>
                    John Doe
                  </Typography>
                  <ExpandMoreIcon fontSize="small" />
                </>
              )}
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
      >
        {drawer}
      </Drawer>

      {renderMenu}
      {renderNotificationMenu}

      {/* Add toolbar spacing */}
      <Toolbar />
    </>
  );
};

export default Navbar;
