import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { JobService } from '../services';
import AdvancedJobFilter from '../components/filters/AdvancedJobFilter';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Alert,
  Container
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  TuneOutlined as TuneIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import JobCard from '../components/ui/JobCard';

const Jobs = () => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isTablet = useMediaQuery(theme.breakpoints.down('lg'));

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [searchParams, setSearchParams] = useState({});

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

  // Fetch jobs when search params or page changes
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);

        // Prepare search parameters
        const searchParamsWithPage = {
          ...searchParams,
          page: page,
          limit: 12
        };

        // Fetch jobs using JobService
        const result = await JobService.searchJobs(searchParamsWithPage);

        setJobs(result.jobs || []);
        setTotalPages(result.totalPages || 1);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, [searchParams, page]);

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
      pathname: '/jobs',
      search: urlParams.toString()
    });

    // Update search params state
    setSearchParams(params);
  };

  const handlePageChange = (event, value) => {
    setPage(value);

    // Update URL with page parameter
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('page', value);

    navigate({
      pathname: '/jobs',
      search: urlParams.toString()
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold' }}>
          Find Your Perfect Job
        </Typography>

        {/* Advanced Search Filter */}
        <AdvancedJobFilter
          onSearch={handleSearch}
          initialFilters={searchParams}
        />

        {/* Job Listings Section */}
        <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'medium' }}>
            {loading ? 'Searching jobs...' : jobs.length > 0 ? `${jobs.length} Jobs Found` : 'No Jobs Found'}
          </Typography>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
            <Button sx={{ ml: 2 }} size="small" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </Alert>
        ) : jobs.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              No jobs found
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Try adjusting your search filters or try a different search term.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                // Clear all filters by navigating to the base URL
                navigate('/jobs');
              }}
            >
              Clear All Filters
            </Button>
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              {jobs.map((job) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={job.id}>
                  <JobCard {...job} />
                </Grid>
              ))}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
                  showFirstButton
                  showLastButton
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>
            )}
          </>
        )}
      </Box>
    </Container>
  );
};

export default Jobs;
