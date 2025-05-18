import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Divider,
  Pagination,
  CircularProgress,
  Alert,
  Rating,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon
} from '@mui/icons-material';
import { CompanyService, SearchService } from '../services';
import { useAuth } from '../context/AuthContext';
import CompanyFilter from '../components/filters/CompanyFilter';

const Companies = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated } = useAuth();

  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useState({});
  const [followedCompanies, setFollowedCompanies] = useState([]);

  // Parse URL search params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageParam = params.get('page');

    if (pageParam) {
      setPage(parseInt(pageParam) || 1);
    }

    // Extract all search parameters
    const searchParamsObj = {};
    params.forEach((value, key) => {
      searchParamsObj[key] = value;
    });

    setSearchParams(searchParamsObj);
  }, [location.search]);

  // Fetch companies when search params or page changes
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);

        // Prepare search parameters
        const searchParamsWithPage = {
          ...searchParams,
          page: page,
          limit: 9
        };

        // Fetch companies using SearchService
        const result = await SearchService.searchCompanies(searchParamsWithPage);

        setCompanies(result.companies || []);
        setTotalPages(result.totalPages || 1);

        // If authenticated, get followed companies
        if (isAuthenticated()) {
          const followed = await CompanyService.getFollowedCompanies();
          setFollowedCompanies(followed.map(company => company.id));
        }
      } catch (err) {
        console.error('Error fetching companies:', err);
        setError('Failed to load companies. Please try again.');
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [searchParams, page, isAuthenticated]);

  // Handle search
  const handleSearch = (params) => {
    // Update URL with search params
    const urlParams = new URLSearchParams();

    // Add all search parameters to URL
    Object.entries(params).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        urlParams.append(key, value.join(','));
      } else if (value !== '' && value !== null && value !== undefined &&
                (typeof value !== 'object' || Object.keys(value).length > 0)) {
        urlParams.append(key, value);
      }
    });

    // Reset page to 1 when search changes
    setPage(1);

    // Update URL
    navigate({
      pathname: '/companies',
      search: urlParams.toString()
    });

    // Update search params state
    setSearchParams(params);
  };

  // Handle pagination change
  const handlePageChange = (event, value) => {
    setPage(value);

    // Update URL with page parameter
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('page', value);

    navigate({
      pathname: '/companies',
      search: urlParams.toString()
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle company follow status
  const handleToggleFollow = async (companyId) => {
    if (!isAuthenticated()) {
      // Redirect to login if not authenticated
      navigate('/login?redirect=/companies');
      return;
    }

    try {
      if (followedCompanies.includes(companyId)) {
        await CompanyService.unfollowCompany(companyId);
        setFollowedCompanies(prev => prev.filter(id => id !== companyId));
      } else {
        await CompanyService.followCompany(companyId);
        setFollowedCompanies(prev => [...prev, companyId]);
      }
    } catch (err) {
      console.error('Error toggling follow status:', err);
    }
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          Browse Companies
        </Typography>

        {/* Advanced Company Filter */}
        <CompanyFilter
          onSearch={handleSearch}
          initialFilters={searchParams}
        />

        {/* Error message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
            <Button sx={{ ml: 2 }} size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Alert>
        )}

      {/* Loading indicator */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}

      {/* Companies grid */}
      {!loading && companies.length === 0 ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          No companies found matching your search criteria.
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {companies.map((company) => (
            <Grid item xs={12} sm={6} md={4} key={company.id}>
              <Card sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                }
              }}>
                <Box sx={{ position: 'relative', pt: '56.25%' }}>
                  <CardMedia
                    component="img"
                    image={company.logo || 'https://via.placeholder.com/300x150?text=Company+Logo'}
                    alt={company.name}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      bgcolor: 'grey.100',
                      p: 2
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {company.name}
                    </Typography>
                    <Button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleToggleFollow(company.id);
                      }}
                      sx={{ minWidth: 'auto', p: 0.5 }}
                    >
                      {followedCompanies.includes(company.id) ? (
                        <BookmarkIcon color="primary" />
                      ) : (
                        <BookmarkBorderIcon />
                      )}
                    </Button>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Rating value={company.rating} precision={0.5} readOnly size="small" />
                    <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                      ({company.reviews || 0})
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {company.location}
                    </Typography>
                  </Box>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <BusinessIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {company.industry}
                    </Typography>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{
                    mb: 2,
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }}>
                    {company.description}
                  </Typography>

                  <Divider sx={{ mb: 2 }} />

                  <Button
                    component={Link}
                    to={`/companies/${company.id}`}
                    variant="outlined"
                    fullWidth
                  >
                    View Company
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Pagination */}
      {!loading && companies.length > 0 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? 'small' : 'medium'}
          />
        </Box>
      )}
      </Box>
    </Container>
  );
};

export default Companies;
