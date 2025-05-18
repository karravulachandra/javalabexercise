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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  AttachMoney as SalaryIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Description as DescriptionIcon,
  Person as PersonIcon,
  Share as ShareIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  Flag as FlagIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon
} from '@mui/icons-material';
import JobService from '../services/jobService';
import CompanyService from '../services/companyService';
import { useAuth } from '../context/AuthContext';

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser, isAuthenticated } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [job, setJob] = useState(null);
  const [company, setCompany] = useState(null);
  const [similarJobs, setSimilarJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saved, setSaved] = useState(false);
  const [applyDialogOpen, setApplyDialogOpen] = useState(false);
  const [application, setApplication] = useState({
    coverLetter: '',
    phone: currentUser?.phone || '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch job details
        const jobData = await JobService.getJobById(id);
        setJob(jobData);
        
        // Fetch company details
        if (jobData.companyId) {
          const companyData = await CompanyService.getCompanyById(jobData.companyId);
          setCompany(companyData);
        }
        
        // Fetch similar jobs
        const similarJobsData = await JobService.getJobs({
          category: jobData.category,
          limit: 3,
          exclude: id
        });
        setSimilarJobs(similarJobsData.jobs);
        
        // Check if job is saved
        if (isAuthenticated()) {
          const savedJobs = await JobService.getSavedJobs();
          setSaved(savedJobs.some(savedJob => savedJob.id === id));
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id, isAuthenticated]);

  const handleToggleSave = async () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    
    try {
      if (saved) {
        await JobService.unsaveJob(id);
      } else {
        await JobService.saveJob(id);
      }
      setSaved(!saved);
    } catch (err) {
      console.error('Error toggling save status:', err);
    }
  };

  const handleApplyClick = () => {
    if (!isAuthenticated()) {
      navigate('/login', { state: { from: `/jobs/${id}` } });
      return;
    }
    setApplyDialogOpen(true);
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitApplication = async () => {
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);
    
    try {
      await JobService.applyForJob(id, application);
      setSubmitSuccess(true);
      setTimeout(() => {
        setApplyDialogOpen(false);
        setApplication({
          coverLetter: '',
          phone: currentUser?.phone || '',
        });
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setSubmitError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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

  if (!job) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">Job not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          component={Link}
          to="/jobs"
          sx={{ mt: 2 }}
        >
          Back to Jobs
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ mb: 3 }}
      >
        Back to Jobs
      </Button>
      
      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Avatar
                  src={company?.logo}
                  alt={company?.name}
                  variant="rounded"
                  sx={{ width: 70, height: 70, mr: 2 }}
                >
                  {company?.name?.charAt(0)}
                </Avatar>
                <Box>
                  <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {job.title}
                  </Typography>
                  <Typography variant="h6" component={Link} to={`/companies/${company?.id}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                    {company?.name}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex' }}>
                <IconButton onClick={handleToggleSave} color={saved ? 'primary' : 'default'}>
                  {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
                <IconButton>
                  <ShareIcon />
                </IconButton>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
              <Chip
                icon={<LocationIcon />}
                label={job.location}
                variant="outlined"
              />
              <Chip
                icon={<WorkIcon />}
                label={job.jobType}
                variant="outlined"
              />
              <Chip
                icon={<SalaryIcon />}
                label={job.salary}
                variant="outlined"
              />
              <Chip
                icon={<TimeIcon />}
                label={`Posted on ${formatDate(job.postedDate)}`}
                variant="outlined"
              />
            </Box>
            
            <Box sx={{ mb: 4 }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleApplyClick}
                startIcon={<SendIcon />}
                sx={{ mr: 2 }}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={handleToggleSave}
                startIcon={saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              >
                {saved ? 'Saved' : 'Save Job'}
              </Button>
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Job Description
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
              {job.description}
            </Typography>
            
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Requirements
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
              {job.requirements}
            </Typography>
            
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Responsibilities
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
              {job.responsibilities}
            </Typography>
            
            <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
              Benefits
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, whiteSpace: 'pre-line' }}>
              {job.benefits}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              <Typography variant="h6" component="h3" sx={{ width: '100%', mb: 1 }}>
                Skills:
              </Typography>
              {job.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  sx={{ bgcolor: 'primary.50', color: 'primary.main' }}
                />
              ))}
            </Box>
            
            <Divider sx={{ my: 3 }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleApplyClick}
              >
                Apply Now
              </Button>
              <Button
                variant="outlined"
                color="error"
                startIcon={<FlagIcon />}
                size="small"
              >
                Report Job
              </Button>
            </Box>
          </Paper>
        </Grid>
        
        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Company Card */}
          <Paper sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              About the Company
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={company?.logo}
                alt={company?.name}
                variant="rounded"
                sx={{ width: 50, height: 50, mr: 2 }}
              >
                {company?.name?.charAt(0)}
              </Avatar>
              <Typography variant="h6" component={Link} to={`/companies/${company?.id}`} sx={{ color: 'primary.main', textDecoration: 'none' }}>
                {company?.name}
              </Typography>
            </Box>
            
            <Typography variant="body2" sx={{ mb: 2 }}>
              {company?.description?.substring(0, 200)}...
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <BusinessIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={`Industry: ${company?.industry}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <LocationIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={`Location: ${company?.location}`} />
              </ListItem>
              <ListItem>
                <ListItemIcon sx={{ minWidth: 40 }}>
                  <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary={`Company Size: ${company?.size} employees`} />
              </ListItem>
            </List>
            
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to={`/companies/${company?.id}`}
              fullWidth
              sx={{ mt: 2 }}
            >
              View Company Profile
            </Button>
          </Paper>
          
          {/* Similar Jobs */}
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mb: 2 }}>
              Similar Jobs
            </Typography>
            
            {similarJobs.length > 0 ? (
              <List disablePadding>
                {similarJobs.map((similarJob) => (
                  <Box key={similarJob.id}>
                    <ListItem
                      component={Link}
                      to={`/jobs/${similarJob.id}`}
                      sx={{
                        display: 'block',
                        textDecoration: 'none',
                        color: 'inherit',
                        py: 2,
                        '&:hover': {
                          bgcolor: 'grey.50',
                        },
                      }}
                      disableGutters
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                        {similarJob.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                        {similarJob.company}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {similarJob.location}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <SalaryIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
                          <Typography variant="body2" color="text.secondary">
                            {similarJob.salary}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItem>
                    <Divider />
                  </Box>
                ))}
              </List>
            ) : (
              <Typography variant="body2" color="text.secondary">
                No similar jobs found.
              </Typography>
            )}
            
            <Button
              variant="text"
              color="primary"
              component={Link}
              to="/jobs"
              fullWidth
              sx={{ mt: 2 }}
            >
              View All Jobs
            </Button>
          </Paper>
        </Grid>
      </Grid>
      
      {/* Apply Dialog */}
      <Dialog
        open={applyDialogOpen}
        onClose={() => !submitting && setApplyDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Apply for {job.title}</DialogTitle>
        <DialogContent>
          {submitSuccess ? (
            <Alert severity="success" sx={{ mb: 2 }}>
              Your application has been submitted successfully!
            </Alert>
          ) : (
            <>
              {submitError && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {submitError}
                </Alert>
              )}
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                You are applying to {job.title} at {company?.name}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="Phone Number"
                    name="phone"
                    value={application.phone}
                    onChange={handleApplicationChange}
                    fullWidth
                    required
                    disabled={submitting}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    label="Cover Letter"
                    name="coverLetter"
                    value={application.coverLetter}
                    onChange={handleApplicationChange}
                    multiline
                    rows={6}
                    fullWidth
                    required
                    disabled={submitting}
                    placeholder="Explain why you're a good fit for this position..."
                  />
                </Grid>
              </Grid>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {!submitSuccess && (
            <>
              <Button onClick={() => setApplyDialogOpen(false)} disabled={submitting}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmitApplication}
                variant="contained"
                color="primary"
                disabled={submitting}
                startIcon={submitting ? <CircularProgress size={20} /> : null}
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default JobDetail;
