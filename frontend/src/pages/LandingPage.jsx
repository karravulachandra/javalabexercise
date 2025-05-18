import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Button,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { LoadingSpinner, PageTransition } from '../components/ui';

const LandingPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { title: 'Find Jobs', path: '/jobs' },
    { title: 'Companies', path: '/companies' },
    { title: 'Resources', path: '/resources' },
    { title: 'Pricing', path: '/pricing' },
  ];

  if (loading) {
    return <LoadingSpinner fullScreen text="Loading TopHire..." />;
  }

  return (
    <PageTransition type="fade" duration={800}>
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: '1px solid #eee', backgroundColor: 'white' }}>
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <Typography
                variant="h6"
                component={Link}
                to="/"
                sx={{
                  mr: 2,
                  display: 'flex',
                  fontWeight: 700,
                  textDecoration: 'none',
                  background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                TopHire
              </Typography>

              {isMobile ? (
                <>
                  <Box sx={{ flexGrow: 1 }} />
                  <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleMobileMenu}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={mobileMenuOpen}
                    onClose={toggleMobileMenu}
                  >
                    <Box
                      sx={{ width: 250, pt: 2 }}
                      role="presentation"
                      onClick={toggleMobileMenu}
                    >
                      <List>
                        {navItems.map((item) => (
                          <ListItem button key={item.title} component={Link} to={item.path}>
                            <ListItemText primary={item.title} />
                          </ListItem>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <ListItem>
                          <Button
                            variant="outlined"
                            color="primary"
                            component={Link}
                            to="/login"
                            fullWidth
                          >
                            Log In
                          </Button>
                        </ListItem>
                        <ListItem>
                          <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to="/signup"
                            fullWidth
                          >
                            Sign Up
                          </Button>
                        </ListItem>
                      </List>
                    </Box>
                  </Drawer>
                </>
              ) : (
                <>
                  <Box sx={{ flexGrow: 1, display: 'flex', ml: 4 }}>
                    {navItems.map((item) => (
                      <Button
                        key={item.title}
                        component={Link}
                        to={item.path}
                        sx={{ color: 'text.primary', mx: 1 }}
                        variant="text"
                      >
                        {item.title}
                      </Button>
                    ))}
                  </Box>
                  <Button
                    variant="outlined"
                    color="primary"
                    component={Link}
                    to="/login"
                    sx={{ mr: 2 }}
                  >
                    Log In
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to="/signup"
                  >
                    Sign Up
                  </Button>
                </>
              )}
            </Toolbar>
          </Container>
        </AppBar>

        {/* Main Content */}
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{
              pt: 12,
              pb: 8,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <Container maxWidth="lg">
              <Typography variant="h2" component="h1" align="center" gutterBottom>
                Welcome to TopHire
              </Typography>
              <Typography variant="h5" align="center" color="textSecondary" paragraph>
                Find your dream job with our AI-powered job matching platform
              </Typography>
              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Button variant="contained" color="primary" component={Link} to="/jobs" sx={{ mx: 1 }}>
                  Browse Jobs
                </Button>
                <Button variant="outlined" color="primary" component={Link} to="/companies" sx={{ mx: 1 }}>
                  View Companies
                </Button>
              </Box>
            </Container>
          </Box>
        </Box>
      </Box>
    </PageTransition>
  );
};

export default LandingPage;
