import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Error as ErrorIcon, Home as HomeIcon } from '@mui/icons-material';

const Unauthorized = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'grey.50'
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          
          <Typography variant="h3" component="h1" gutterBottom>
            Access Denied
          </Typography>
          
          <Typography variant="h5" color="text.secondary" paragraph>
            You don't have permission to access this page.
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph sx={{ maxWidth: 600 }}>
            This area is restricted to users with specific roles or permissions. 
            If you believe you should have access, please contact your administrator.
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/"
              startIcon={<HomeIcon />}
            >
              Go to Home
            </Button>
            
            <Button
              variant="outlined"
              component={Link}
              to="/dashboard"
            >
              Go to Dashboard
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Unauthorized;
