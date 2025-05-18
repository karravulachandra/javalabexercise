import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  Rating,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Divider,
  Alert,
  CircularProgress,
  Breadcrumbs
} from '@mui/material';
import {
  Star as StarIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import { CompanyService } from '../services';
import { useAuth } from '../context/AuthContext';

const CompanyReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  
  const [reviewData, setReviewData] = useState({
    rating: 0,
    title: '',
    review: '',
    pros: '',
    cons: '',
    position: '',
    employmentStatus: 'current',
    recommended: 'yes'
  });
  
  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/companies/${id}/review` } });
    }
  }, [isAuthenticated, navigate, id]);
  
  // Fetch company details
  useEffect(() => {
    const fetchCompanyDetails = async () => {
      try {
        setLoading(true);
        const companyData = await CompanyService.getCompanyById(id);
        setCompany(companyData);
      } catch (err) {
        console.error('Error fetching company details:', err);
        setError('Failed to load company details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchCompanyDetails();
  }, [id]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRatingChange = (event, newValue) => {
    setReviewData(prev => ({
      ...prev,
      rating: newValue
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (reviewData.rating === 0) {
      setError('Please provide a rating');
      return;
    }
    
    if (!reviewData.title.trim()) {
      setError('Please provide a review title');
      return;
    }
    
    if (!reviewData.review.trim()) {
      setError('Please provide a review');
      return;
    }
    
    try {
      setSubmitting(true);
      setError(null);
      
      // Transform data for API
      const apiData = {
        ...reviewData,
        recommended: reviewData.recommended === 'yes',
        date: new Date().toISOString().split('T')[0]
      };
      
      // Submit review
      await CompanyService.addCompanyReview(id, apiData);
      
      setSuccess(true);
      
      // Redirect after success
      setTimeout(() => {
        navigate(`/companies/${id}`);
      }, 2000);
    } catch (err) {
      console.error('Error submitting review:', err);
      setError('Failed to submit review. Please try again later.');
    } finally {
      setSubmitting(false);
    }
  };
  
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }
  
  if (!company) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error">Company not found</Alert>
        <Button
          component={Link}
          to="/companies"
          startIcon={<ArrowBackIcon />}
          sx={{ mt: 2 }}
        >
          Back to Companies
        </Button>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 3 }}>
        <Link to="/companies" style={{ textDecoration: 'none', color: 'inherit' }}>
          Companies
        </Link>
        <Link to={`/companies/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          {company.name}
        </Link>
        <Typography color="text.primary">Write a Review</Typography>
      </Breadcrumbs>
      
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Review {company.name}
        </Typography>
        
        <Typography variant="body1" color="text.secondary" paragraph>
          Share your experience working at {company.name} to help others make better career decisions.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Your review has been submitted successfully! Redirecting...
          </Alert>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={3}>
            {/* Overall Rating */}
            <Grid item xs={12}>
              <Typography component="legend" variant="h6" gutterBottom>
                Overall Rating
              </Typography>
              <Rating
                name="rating"
                value={reviewData.rating}
                onChange={handleRatingChange}
                size="large"
                precision={0.5}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
              />
            </Grid>
            
            <Grid item xs={12}>
              <Divider />
            </Grid>
            
            {/* Review Title */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Review Title"
                name="title"
                value={reviewData.title}
                onChange={handleChange}
                placeholder="Summarize your experience"
                disabled={submitting}
              />
            </Grid>
            
            {/* Review */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                rows={6}
                label="Your Review"
                name="review"
                value={reviewData.review}
                onChange={handleChange}
                placeholder="What was it like working at this company?"
                disabled={submitting}
              />
            </Grid>
            
            {/* Pros */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Pros"
                name="pros"
                value={reviewData.pros}
                onChange={handleChange}
                placeholder="What did you like about working here?"
                disabled={submitting}
              />
            </Grid>
            
            {/* Cons */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                multiline
                rows={4}
                label="Cons"
                name="cons"
                value={reviewData.cons}
                onChange={handleChange}
                placeholder="What didn't you like about working here?"
                disabled={submitting}
              />
            </Grid>
            
            {/* Position */}
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Your Job Title"
                name="position"
                value={reviewData.position}
                onChange={handleChange}
                placeholder="e.g. Software Engineer"
                disabled={submitting}
              />
            </Grid>
            
            {/* Employment Status */}
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Employment Status</FormLabel>
                <RadioGroup
                  name="employmentStatus"
                  value={reviewData.employmentStatus}
                  onChange={handleChange}
                >
                  <FormControlLabel value="current" control={<Radio />} label="Current Employee" disabled={submitting} />
                  <FormControlLabel value="former" control={<Radio />} label="Former Employee" disabled={submitting} />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            {/* Recommend */}
            <Grid item xs={12} md={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">Would you recommend working here?</FormLabel>
                <RadioGroup
                  name="recommended"
                  value={reviewData.recommended}
                  onChange={handleChange}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" disabled={submitting} />
                  <FormControlLabel value="no" control={<Radio />} label="No" disabled={submitting} />
                </RadioGroup>
              </FormControl>
            </Grid>
            
            <Grid item xs={12}>
              <Divider />
            </Grid>
            
            {/* Submit Button */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                component={Link}
                to={`/companies/${id}`}
                disabled={submitting}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                disabled={submitting || success}
                startIcon={submitting ? <CircularProgress size={20} /> : null}
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default CompanyReview;
