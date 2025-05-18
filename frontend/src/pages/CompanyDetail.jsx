import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Chip,
  Divider,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Tab,
  Tabs,
  Rating,
  Card,
  CardContent,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Language as LanguageIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  Work as WorkIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  ArrowBack as ArrowBackIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Share as ShareIcon
} from '@mui/icons-material';
import CompanyService from '../services/companyService';
import JobService from '../services/jobService';
import { useAuth } from '../context/AuthContext';

// Tab Panel Component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`company-tabpanel-${index}`}
      aria-labelledby={`company-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const CompanyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [company, setCompany] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [followed, setFollowed] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch company details
        const companyData = await CompanyService.getCompanyById(id);
        setCompany(companyData);

        // Fetch company jobs
        const jobsData = await JobService.getJobsByCompany(id);
        setJobs(jobsData);

        // Fetch company reviews
        const reviewsData = await CompanyService.getCompanyReviews(id);
        setReviews(reviewsData);

        // Check if company is followed
        if (isAuthenticated()) {
          const followedCompanies = await CompanyService.getFollowedCompanies();
          setFollowed(followedCompanies.some(company => company.id === id));
        }
      } catch (err) {
        console.error('Error fetching company details:', err);
        setError('Failed to load company details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [id, isAuthenticated]);

  const handleToggleFollow = async () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/companies/${id}` } });
      return;
    }

    try {
      if (followed) {
        await CompanyService.unfollowCompany(id);
      } else {
        await CompanyService.followCompany(id);
      }
      setFollowed(!followed);
    } catch (err) {
      console.error('Error toggling follow status:', err);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error">{error}</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{ mt: 2 }}
        >
          Go Back
        </Button>
      </Container>
    );
  }

  if (!company) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Company not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/companies"
          sx={{ mt: 2 }}
        >
          Back to Companies
        </Button>
      </Container>
    );
  }

  // Calculate average rating
  const averageRating = reviews.length > 0
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
    : 0;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back
      </Button>

      {/* Company Header */}
      <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: isMobile ? 2 : 0 }}>
            <Avatar
              src={company.logo}
              alt={company.name}
              variant="rounded"
              sx={{ width: 100, height: 100, mr: 3 }}
            >
              {company.name.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                {company.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Rating value={averageRating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                  ({reviews.length} reviews)
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                <Typography variant="body1" color="text.secondary">
                  {company.location}
                </Typography>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleToggleFollow}
              startIcon={followed ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              sx={{ mr: 1 }}
            >
              {followed ? 'Following' : 'Follow'}
            </Button>
            <IconButton>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>
      </Paper>

      {/* Tabs Navigation */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="company tabs">
          <Tab label="About" />
          <Tab label={`Jobs (${jobs.length})`} />
          <Tab label={`Reviews (${reviews.length})`} />
        </Tabs>
      </Box>

      {/* About Tab */}
      <TabPanel value={tabValue} index={0}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
                About {company.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
                {company.description}
              </Typography>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Company Culture
              </Typography>
              <Typography variant="body1" sx={{ mb: 3 }}>
                {company.culture || 'No information available about company culture.'}
              </Typography>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Benefits & Perks
              </Typography>
              <Box sx={{ mb: 3 }}>
                {Array.isArray(company.benefits) ? (
                  <Grid container spacing={1}>
                    {company.benefits.map((benefit, index) => (
                      <Grid item key={index}>
                        <Chip
                          label={benefit}
                          sx={{ bgcolor: 'success.50', color: 'success.dark' }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                ) : (
                  <Typography variant="body1">
                    No information available about benefits and perks.
                  </Typography>
                )}
              </Box>

              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Mission Statement
              </Typography>
              <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                "{company.mission || 'No mission statement available.'}"
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                <Typography variant="h6" component="h3" sx={{ width: '100%', mb: 1 }}>
                  Industry:
                </Typography>
                <Chip
                  label={company.industry}
                  sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                />
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, borderRadius: 2, mb: 4 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Company Information
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <BusinessIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Industry"
                    secondary={company.industry}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PersonIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Company Size"
                    secondary={`${company.size} employees`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LocationIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Headquarters"
                    secondary={company.location}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <LanguageIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Website"
                    secondary={
                      <Link
                        href={company.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: theme.palette.primary.main }}
                      >
                        {company.website}
                      </Link>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <PhoneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Phone"
                    secondary={company.phone || 'Not available'}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <EmailIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={company.email || 'Not available'}
                  />
                </ListItem>
              </List>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
                Company Statistics
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Open Positions
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {jobs.length}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Average Rating
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="body1" fontWeight="bold" sx={{ mr: 1 }}>
                    {averageRating.toFixed(1)}
                  </Typography>
                  <StarIcon fontSize="small" sx={{ color: theme.palette.warning.main }} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Reviews
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {reviews.length}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Founded
                </Typography>
                <Typography variant="body1" fontWeight="bold">
                  {company.founded || 'N/A'}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Verified
                </Typography>
                <Typography variant="body1" fontWeight="bold" color={company.isVerified ? "success.main" : "text.secondary"}>
                  {company.isVerified ? "Yes" : "No"}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </TabPanel>

      {/* Jobs Tab */}
      <TabPanel value={tabValue} index={1}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
          Open Positions at {company.name}
        </Typography>

        {jobs.length > 0 ? (
          <Grid container spacing={3}>
            {jobs.map((job) => (
              <Grid item xs={12} sm={6} md={4} key={job.id}>
                <Card
                  component={Link}
                  to={`/jobs/${job.id}`}
                  sx={{
                    height: '100%',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 1 }}>
                      {job.title}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                      <Chip
                        icon={<LocationIcon fontSize="small" />}
                        label={job.location}
                        size="small"
                        variant="outlined"
                      />
                      <Chip
                        icon={<WorkIcon fontSize="small" />}
                        label={job.jobType}
                        size="small"
                        variant="outlined"
                      />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {job.description?.substring(0, 100)}...
                    </Typography>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Typography variant="body2" color="primary" fontWeight="medium">
                        View Details
                      </Typography>
                      <Chip
                        label={job.salary}
                        size="small"
                        sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">
            No open positions available at this time.
          </Alert>
        )}
      </TabPanel>

      {/* Reviews Tab */}
      <TabPanel value={tabValue} index={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold' }}>
            Employee Reviews
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={isAuthenticated() ? `/companies/${id}/review` : '/login'}
            state={!isAuthenticated() ? { from: `/companies/${id}` } : undefined}
          >
            Write a Review
          </Button>
        </Box>

        {reviews.length > 0 ? (
          <Grid container spacing={3}>
            {reviews.map((review) => (
              <Grid item xs={12} key={review.id}>
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box>
                      <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
                        {review.title}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Rating value={review.rating} readOnly />
                        <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                          {new Date(review.date).toLocaleDateString()}
                        </Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {review.position} • {review.employmentStatus}
                      </Typography>
                    </Box>
                    <Chip
                      label={review.recommended ? 'Recommends' : 'Doesn\'t Recommend'}
                      color={review.recommended ? 'success' : 'error'}
                      size="small"
                    />
                  </Box>

                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {review.content}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Pros
                    </Typography>
                    <Typography variant="body2">
                      {review.pros || 'No pros mentioned.'}
                    </Typography>
                  </Box>

                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 1 }}>
                      Cons
                    </Typography>
                    <Typography variant="body2">
                      {review.cons || 'No cons mentioned.'}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Alert severity="info">
            No reviews available for this company. Be the first to write a review!
          </Alert>
        )}
      </TabPanel>
    </Container>
  );
};

export default CompanyDetail;
