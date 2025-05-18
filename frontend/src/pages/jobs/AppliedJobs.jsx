import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Divider,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Paper,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Tooltip,
  Badge,
  Tabs,
  Tab,
  LinearProgress,
  Stepper,
  Step,
  StepLabel
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as SalaryIcon,
  Work as WorkIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Share as ShareIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Email as EmailIcon,
  Description as ResumeIcon,
  CalendarToday as DateIcon
} from '@mui/icons-material';

const AppliedJobs = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [withdrawDialogOpen, setWithdrawDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Mock applied jobs data
  const [applications, setApplications] = useState([
    {
      id: 1,
      jobId: 101,
      jobTitle: 'Senior Frontend Developer',
      company: 'Tech Solutions Inc.',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$120,000 - $150,000',
      appliedDate: '2023-05-10',
      status: 'applied',
      statusDate: '2023-05-10',
      resumeUrl: '#',
      coverLetterUrl: '#'
    },
    {
      id: 2,
      jobId: 102,
      jobTitle: 'UX Designer',
      company: 'Creative Designs',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      appliedDate: '2023-05-08',
      status: 'reviewed',
      statusDate: '2023-05-12',
      resumeUrl: '#',
      coverLetterUrl: '#'
    },
    {
      id: 3,
      jobId: 103,
      jobTitle: 'Backend Developer',
      company: 'Data Systems',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$130,000 - $160,000',
      appliedDate: '2023-05-05',
      status: 'interview',
      statusDate: '2023-05-15',
      interviewDate: '2023-05-20',
      resumeUrl: '#',
      coverLetterUrl: '#'
    },
    {
      id: 4,
      jobId: 104,
      jobTitle: 'Product Manager',
      company: 'Innovate Labs',
      location: 'Chicago, IL',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      appliedDate: '2023-04-28',
      status: 'rejected',
      statusDate: '2023-05-10',
      resumeUrl: '#',
      coverLetterUrl: '#'
    },
    {
      id: 5,
      jobId: 105,
      jobTitle: 'DevOps Engineer',
      company: 'Cloud Solutions',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$125,000 - $155,000',
      appliedDate: '2023-05-01',
      status: 'offer',
      statusDate: '2023-05-18',
      offerDetails: 'Offer: $140,000/year with benefits',
      resumeUrl: '#',
      coverLetterUrl: '#'
    }
  ]);

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Handle menu open
  const handleMenuOpen = (event, application) => {
    setAnchorEl(event.currentTarget);
    setSelectedApplication(application);
  };

  // Handle menu close
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Handle view application dialog
  const handleViewApplication = () => {
    setViewDialogOpen(true);
    handleMenuClose();
  };

  // Handle view dialog close
  const handleViewDialogClose = () => {
    setViewDialogOpen(false);
  };

  // Handle withdraw dialog open
  const handleWithdrawDialogOpen = () => {
    setWithdrawDialogOpen(true);
    handleMenuClose();
  };

  // Handle withdraw dialog close
  const handleWithdrawDialogClose = () => {
    setWithdrawDialogOpen(false);
  };

  // Handle application withdrawal
  const handleWithdrawApplication = () => {
    if (selectedApplication) {
      setApplications(applications.filter(app => app.id !== selectedApplication.id));
      setSuccessMessage(`Your application for "${selectedApplication.jobTitle}" has been withdrawn.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    setWithdrawDialogOpen(false);
  };

  // Filter applications based on search query and tab value
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter based on tab value
    let matchesTab = true;
    if (tabValue === 1) { // Active
      matchesTab = ['applied', 'reviewed', 'interview'].includes(app.status);
    } else if (tabValue === 2) { // Completed
      matchesTab = ['offer', 'rejected'].includes(app.status);
    }
    
    return matchesSearch && matchesTab;
  });

  // Get status chip color and label
  const getStatusChip = (status) => {
    switch (status) {
      case 'applied':
        return <Chip label="Applied" size="small" color="primary" />;
      case 'reviewed':
        return <Chip label="Reviewed" size="small" color="info" />;
      case 'interview':
        return <Chip label="Interview" size="small" color="warning" />;
      case 'offer':
        return <Chip label="Offer Received" size="small" color="success" />;
      case 'rejected':
        return <Chip label="Not Selected" size="small" color="error" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Get application progress percentage
  const getProgressPercentage = (status) => {
    switch (status) {
      case 'applied':
        return 20;
      case 'reviewed':
        return 40;
      case 'interview':
        return 60;
      case 'offer':
        return 100;
      case 'rejected':
        return 100;
      default:
        return 0;
    }
  };

  // Count applications by status
  const countByStatus = (status) => {
    if (status === 'active') {
      return applications.filter(app => ['applied', 'reviewed', 'interview'].includes(app.status)).length;
    } else if (status === 'completed') {
      return applications.filter(app => ['offer', 'rejected'].includes(app.status)).length;
    }
    return applications.length;
  };

  // Get application steps
  const getApplicationSteps = () => {
    return ['Applied', 'Reviewed', 'Interview', 'Decision'];
  };

  // Get active step based on status
  const getActiveStep = (status) => {
    switch (status) {
      case 'applied':
        return 0;
      case 'reviewed':
        return 1;
      case 'interview':
        return 2;
      case 'offer':
      case 'rejected':
        return 3;
      default:
        return 0;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          My Applications
          <Badge 
            badgeContent={applications.length} 
            color="primary" 
            sx={{ ml: 2 }}
          />
        </Typography>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Paper elevation={1} sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          sx={{ px: 2, pt: 2 }}
        >
          <Tab 
            label="All Applications" 
            icon={<Badge badgeContent={countByStatus('all')} color="primary" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Active" 
            icon={<Badge badgeContent={countByStatus('active')} color="info" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Completed" 
            icon={<Badge badgeContent={countByStatus('completed')} color="success" max={99} />} 
            iconPosition="end"
          />
        </Tabs>
        
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search applications by job title, company, or location"
            value={searchQuery}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            size="small"
          />
        </Box>
      </Paper>
      
      {filteredApplications.length === 0 ? (
        <Paper elevation={1} sx={{ p: 4, borderRadius: 2, textAlign: 'center' }}>
          <WorkIcon sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            No applications found
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            {searchQuery ? 
              "No applications match your search criteria." : 
              "You haven't applied to any jobs yet."}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/jobs"
          >
            Browse Jobs
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {filteredApplications.map((application) => (
            <Grid item xs={12} key={application.id}>
              <Card elevation={1} sx={{ borderRadius: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Box>
                      <Typography variant="h5" component="h2" gutterBottom>
                        {application.jobTitle}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                        <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                          <BusinessIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {application.company}
                        </Box>
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {application.location}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <WorkIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {application.type}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                          <SalaryIcon fontSize="small" sx={{ mr: 0.5 }} />
                          {application.salary}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                      {getStatusChip(application.status)}
                      <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                        Status updated: {formatDate(application.statusDate)}
                      </Typography>
                      <IconButton
                        onClick={(event) => handleMenuOpen(event, application)}
                        sx={{ mt: 1 }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Application Progress
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={getProgressPercentage(application.status)} 
                      sx={{ height: 8, borderRadius: 4, mb: 2 }}
                    />
                    <Stepper 
                      activeStep={getActiveStep(application.status)} 
                      alternativeLabel
                      sx={{ mt: 2 }}
                    >
                      {getApplicationSteps().map((label) => (
                        <Step key={label}>
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>
                  
                  {application.status === 'interview' && application.interviewDate && (
                    <Alert severity="info" sx={{ mt: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <DateIcon sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          Interview scheduled for {formatDate(application.interviewDate)}
                        </Typography>
                      </Box>
                    </Alert>
                  )}
                  
                  {application.status === 'offer' && application.offerDetails && (
                    <Alert severity="success" sx={{ mt: 2 }}>
                      <Typography variant="body2">
                        {application.offerDetails}
                      </Typography>
                    </Alert>
                  )}
                </CardContent>
                
                <Divider />
                
                <CardActions sx={{ justifyContent: 'space-between', px: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Applied on {formatDate(application.appliedDate)}
                  </Typography>
                  <Box>
                    <Button
                      size="small"
                      startIcon={<ViewIcon />}
                      onClick={() => {
                        setSelectedApplication(application);
                        setViewDialogOpen(true);
                      }}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      component={Link}
                      to={`/jobs/${application.jobId}`}
                      sx={{ ml: 1 }}
                    >
                      View Job
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Application Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleViewApplication}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Application Details</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={`/jobs/${selectedApplication?.jobId}`} onClick={handleMenuClose}>
          <ListItemIcon>
            <WorkIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Job Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <ShareIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Share</ListItemText>
        </MenuItem>
        {selectedApplication?.status === 'applied' && (
          <>
            <Divider />
            <MenuItem onClick={handleWithdrawDialogOpen} sx={{ color: 'error.main' }}>
              <ListItemIcon sx={{ color: 'error.main' }}>
                <DeleteIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText>Withdraw Application</ListItemText>
            </MenuItem>
          </>
        )}
      </Menu>
      
      {/* View Application Dialog */}
      {selectedApplication && (
        <Dialog
          open={viewDialogOpen}
          onClose={handleViewDialogClose}
          maxWidth="md"
          fullWidth
        >
          <DialogTitle>
            Application Details
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="h6" gutterBottom>
                  {selectedApplication.jobTitle}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                  {selectedApplication.company} • {selectedApplication.location}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2, mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ mr: 1 }}>
                    Application Status:
                  </Typography>
                  {getStatusChip(selectedApplication.status)}
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Application Timeline
                </Typography>
                
                <Box sx={{ ml: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <DateIcon fontSize="small" sx={{ mr: 1, color: 'primary.main' }} />
                    <Typography variant="body2">
                      <strong>Applied:</strong> {formatDate(selectedApplication.appliedDate)}
                    </Typography>
                  </Box>
                  
                  {selectedApplication.status !== 'applied' && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <DateIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
                      <Typography variant="body2">
                        <strong>Reviewed:</strong> {formatDate(selectedApplication.statusDate)}
                      </Typography>
                    </Box>
                  )}
                  
                  {selectedApplication.status === 'interview' && selectedApplication.interviewDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <DateIcon fontSize="small" sx={{ mr: 1, color: 'warning.main' }} />
                      <Typography variant="body2">
                        <strong>Interview:</strong> {formatDate(selectedApplication.interviewDate)}
                      </Typography>
                    </Box>
                  )}
                  
                  {(selectedApplication.status === 'offer' || selectedApplication.status === 'rejected') && (
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      <DateIcon fontSize="small" sx={{ mr: 1, color: selectedApplication.status === 'offer' ? 'success.main' : 'error.main' }} />
                      <Typography variant="body2">
                        <strong>Decision:</strong> {formatDate(selectedApplication.statusDate)}
                      </Typography>
                    </Box>
                  )}
                </Box>
                
                {selectedApplication.status === 'offer' && selectedApplication.offerDetails && (
                  <>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="subtitle2" gutterBottom>
                      Offer Details
                    </Typography>
                    <Typography variant="body2" paragraph>
                      {selectedApplication.offerDetails}
                    </Typography>
                  </>
                )}
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle2" gutterBottom>
                  Documents Submitted
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<ResumeIcon />}
                    fullWidth
                    sx={{ mb: 1 }}
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                  >
                    View Resume
                  </Button>
                  
                  <Button 
                    variant="outlined" 
                    startIcon={<Description />}
                    fullWidth
                    href={selectedApplication.coverLetterUrl}
                    target="_blank"
                  >
                    View Cover Letter
                  </Button>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Contact Information
                </Typography>
                
                <Button 
                  variant="outlined" 
                  startIcon={<EmailIcon />}
                  fullWidth
                  sx={{ mb: 1 }}
                  href={`mailto:${selectedApplication.company.toLowerCase().replace(/\s+/g, '')}@example.com`}
                >
                  Email Recruiter
                </Button>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleViewDialogClose}>Close</Button>
            <Button 
              variant="contained" 
              color="primary"
              component={Link}
              to={`/jobs/${selectedApplication.jobId}`}
              onClick={handleViewDialogClose}
            >
              View Job Details
            </Button>
          </DialogActions>
        </Dialog>
      )}
      
      {/* Withdraw Application Dialog */}
      <Dialog
        open={withdrawDialogOpen}
        onClose={handleWithdrawDialogClose}
      >
        <DialogTitle>Withdraw Application</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to withdraw your application for "{selectedApplication?.jobTitle}" at {selectedApplication?.company}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleWithdrawDialogClose}>Cancel</Button>
          <Button onClick={handleWithdrawApplication} color="error">
            Withdraw
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AppliedJobs;
