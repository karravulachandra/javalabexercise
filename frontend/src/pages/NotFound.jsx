import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Home as HomeIcon, Search as SearchIcon } from '@mui/icons-material';

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        backgroundColor: 'grey.50'
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
          }}
        >
          <Typography
            variant="h1"
            component="h1"
            sx={{
              fontSize: { xs: '6rem', md: '8rem' },
              fontWeight: 700,
              color: 'primary.main',
              mb: 2
            }}
          >
            404
          </Typography>
          
          <Typography
            variant="h4"
            component="h2"
            sx={{
              fontWeight: 600,
              mb: 2
            }}
          >
            Page Not Found
          </Typography>
          
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}
          >
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<HomeIcon />}
              component={Link}
              to="/"
            >
              Back to Home
            </Button>
            
            <Button
              variant="outlined"
              color="primary"
              size="large"
              startIcon={<SearchIcon />}
              component={Link}
              to="/jobs"
            >
              Search Jobs
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFound;
