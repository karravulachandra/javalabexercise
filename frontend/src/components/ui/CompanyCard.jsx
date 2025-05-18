import { Link } from 'react-router-dom';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Avatar, 
  Chip, 
  Button,
  Rating
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  People as PeopleIcon
} from '@mui/icons-material';

const CompanyCard = ({ 
  id, 
  name, 
  logo, 
  industry, 
  location, 
  size, 
  rating, 
  openPositions,
  isVerified = false,
  isFeatured = false
}) => {
  return (
    <Card 
      component={Link} 
      to={`/companies/${id}`}
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
        position: 'relative',
        overflow: 'visible',
        border: isFeatured ? '1px solid' : 'none',
        borderColor: 'primary.main',
      }}
    >
      {isFeatured && (
        <Chip 
          label="Featured" 
          color="primary" 
          size="small"
          sx={{ 
            position: 'absolute', 
            top: -10, 
            right: 16,
            fontWeight: 'bold',
          }}
        />
      )}
      
      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <Avatar 
            src={logo} 
            alt={name}
            variant="rounded"
            sx={{ 
              width: 60, 
              height: 60, 
              mr: 2,
              border: '1px solid #eee'
            }}
          >
            {name.charAt(0)}
          </Avatar>
          
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold' }}>
                {name}
              </Typography>
              
              {isVerified && (
                <Chip 
                  label="Verified" 
                  size="small" 
                  color="success"
                  sx={{ 
                    ml: 1,
                    height: 20,
                    fontSize: '0.7rem',
                    fontWeight: 'bold'
                  }}
                />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
              <Rating value={rating} precision={0.5} size="small" readOnly />
              <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                ({rating.toFixed(1)})
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {industry}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PeopleIcon fontSize="small" sx={{ color: 'text.secondary', mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              {size} employees
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Chip 
              label={`${openPositions} open positions`} 
              size="small" 
              sx={{ 
                bgcolor: 'primary.50', 
                color: 'primary.main',
                fontWeight: 'medium',
              }}
            />
            
            <Button 
              variant="outlined" 
              color="primary" 
              size="small"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // Follow company logic here
              }}
            >
              Follow
            </Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CompanyCard;
