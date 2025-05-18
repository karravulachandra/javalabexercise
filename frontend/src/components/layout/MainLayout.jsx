import { useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

const MainLayout = ({ children, showSidebar = true, showFooter = true }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      
      <Box sx={{ display: 'flex', flexGrow: 1 }}>
        {showSidebar && (
          <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
        )}
        
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: '100%',
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(showSidebar && !isMobile && {
              marginLeft: sidebarOpen ? 0 : '-260px',
            }),
          }}
        >
          {children}
        </Box>
      </Box>
      
      {showFooter && <Footer />}
    </Box>
  );
};

export default MainLayout;
