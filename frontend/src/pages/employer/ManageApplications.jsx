import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  TextField,
  InputAdornment,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Alert,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Rating,
  Tabs,
  Tab,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  MoreVert as MoreVertIcon,
  Visibility as ViewIcon,
  Email as EmailIcon,
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Delete as DeleteIcon,
  Person as PersonIcon
} from '@mui/icons-material';

const ManageApplications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [jobFilter, setJobFilter] = useState('all');
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Parse job ID from URL query parameters if present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const jobId = params.get('jobId');
    if (jobId) {
      setJobFilter(jobId);
    }
  }, [location.search]);
  
  // Mock applications data
  const [applications, setApplications] = useState([
    {
      id: 1,
      applicantName: 'Michael Johnson',
      applicantEmail: 'michael.johnson@example.com',
      applicantPhone: '+1 (555) 123-4567',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/32.jpg',
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      appliedDate: '2023-05-15',
      status: 'new',
      rating: 4,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Strong React experience, worked at top tech companies.'
    },
    {
      id: 2,
      applicantName: 'Emily Rodriguez',
      applicantEmail: 'emily.rodriguez@example.com',
      applicantPhone: '+1 (555) 234-5678',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/28.jpg',
      jobId: 2,
      jobTitle: 'UX Designer',
      appliedDate: '2023-05-14',
      status: 'reviewed',
      rating: 5,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Excellent portfolio, 7+ years of experience in UX/UI design.'
    },
    {
      id: 3,
      applicantName: 'David Kim',
      applicantEmail: 'david.kim@example.com',
      applicantPhone: '+1 (555) 345-6789',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/45.jpg',
      jobId: 3,
      jobTitle: 'Backend Developer',
      appliedDate: '2023-05-13',
      status: 'interview',
      rating: 4,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Strong Node.js and Python skills, experience with microservices.'
    },
    {
      id: 4,
      applicantName: 'Sarah Wilson',
      applicantEmail: 'sarah.wilson@example.com',
      applicantPhone: '+1 (555) 456-7890',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/37.jpg',
      jobId: 4,
      jobTitle: 'Product Manager',
      appliedDate: '2023-05-12',
      status: 'rejected',
      rating: 2,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Not enough experience in our industry.'
    },
    {
      id: 5,
      applicantName: 'James Taylor',
      applicantEmail: 'james.taylor@example.com',
      applicantPhone: '+1 (555) 567-8901',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/22.jpg',
      jobId: 1,
      jobTitle: 'Senior Frontend Developer',
      appliedDate: '2023-05-11',
      status: 'new',
      rating: 3,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Good JavaScript skills, limited React experience.'
    },
    {
      id: 6,
      applicantName: 'Jennifer Lopez',
      applicantEmail: 'jennifer.lopez@example.com',
      applicantPhone: '+1 (555) 678-9012',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/15.jpg',
      jobId: 5,
      jobTitle: 'DevOps Engineer',
      appliedDate: '2023-05-10',
      status: 'interview',
      rating: 5,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Excellent AWS and Kubernetes experience, worked at Amazon.'
    },
    {
      id: 7,
      applicantName: 'Robert Chen',
      applicantEmail: 'robert.chen@example.com',
      applicantPhone: '+1 (555) 789-0123',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/67.jpg',
      jobId: 2,
      jobTitle: 'UX Designer',
      appliedDate: '2023-05-09',
      status: 'offer',
      rating: 5,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Perfect fit for the role, great portfolio and experience.'
    },
    {
      id: 8,
      applicantName: 'Amanda White',
      applicantEmail: 'amanda.white@example.com',
      applicantPhone: '+1 (555) 890-1234',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/63.jpg',
      jobId: 3,
      jobTitle: 'Backend Developer',
      appliedDate: '2023-05-08',
      status: 'new',
      rating: 3,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Good Java background, limited experience with Node.js.'
    },
    {
      id: 9,
      applicantName: 'Thomas Brown',
      applicantEmail: 'thomas.brown@example.com',
      applicantPhone: '+1 (555) 901-2345',
      applicantPhoto: 'https://randomuser.me/api/portraits/men/55.jpg',
      jobId: 4,
      jobTitle: 'Product Manager',
      appliedDate: '2023-05-07',
      status: 'reviewed',
      rating: 4,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Good experience in product management, worked at similar companies.'
    },
    {
      id: 10,
      applicantName: 'Lisa Garcia',
      applicantEmail: 'lisa.garcia@example.com',
      applicantPhone: '+1 (555) 012-3456',
      applicantPhoto: 'https://randomuser.me/api/portraits/women/42.jpg',
      jobId: 5,
      jobTitle: 'DevOps Engineer',
      appliedDate: '2023-05-06',
      status: 'rejected',
      rating: 2,
      resumeUrl: '#',
      coverLetterUrl: '#',
      notes: 'Limited experience with our tech stack.'
    }
  ]);

  // Mock jobs data for filtering
  const jobs = [
    { id: 1, title: 'Senior Frontend Developer' },
    { id: 2, title: 'UX Designer' },
    { id: 3, title: 'Backend Developer' },
    { id: 4, title: 'Product Manager' },
    { id: 5, title: 'DevOps Engineer' }
  ];

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    
    // Set status filter based on tab
    switch (newValue) {
      case 0: // All
        setStatusFilter('all');
        break;
      case 1: // New
        setStatusFilter('new');
        break;
      case 2: // Reviewed
        setStatusFilter('reviewed');
        break;
      case 3: // Interview
        setStatusFilter('interview');
        break;
      case 4: // Offer
        setStatusFilter('offer');
        break;
      case 5: // Rejected
        setStatusFilter('rejected');
        break;
      default:
        setStatusFilter('all');
    }
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

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(0);
  };

  // Handle job filter change
  const handleJobFilterChange = (event) => {
    setJobFilter(event.target.value);
    setPage(0);
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

  // Handle application status change
  const handleStatusChange = (newStatus) => {
    if (selectedApplication) {
      const updatedApplications = applications.map(app => {
        if (app.id === selectedApplication.id) {
          return { ...app, status: newStatus };
        }
        return app;
      });
      
      setApplications(updatedApplications);
      setSuccessMessage(`Application status updated to ${newStatus}.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    handleMenuClose();
  };

  // Filter applications based on search query, status filter, and job filter
  const filteredApplications = applications.filter(app => {
    const matchesSearch = app.applicantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    
    const matchesJob = jobFilter === 'all' || app.jobId.toString() === jobFilter.toString();
    
    return matchesSearch && matchesStatus && matchesJob;
  });

  // Get status chip color and label
  const getStatusChip = (status) => {
    switch (status) {
      case 'new':
        return <Chip label="New" size="small" color="primary" />;
      case 'reviewed':
        return <Chip label="Reviewed" size="small" color="info" />;
      case 'interview':
        return <Chip label="Interview" size="small" color="warning" />;
      case 'offer':
        return <Chip label="Offer" size="small" color="success" />;
      case 'rejected':
        return <Chip label="Rejected" size="small" color="error" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Count applications by status
  const countByStatus = (status) => {
    return applications.filter(app => status === 'all' || app.status === status).length;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Manage Applications
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
          variant="scrollable"
          scrollButtons="auto"
          sx={{ px: 2, pt: 2 }}
        >
          <Tab 
            label="All" 
            icon={<Badge badgeContent={countByStatus('all')} color="primary" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="New" 
            icon={<Badge badgeContent={countByStatus('new')} color="primary" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Reviewed" 
            icon={<Badge badgeContent={countByStatus('reviewed')} color="info" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Interview" 
            icon={<Badge badgeContent={countByStatus('interview')} color="warning" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Offer" 
            icon={<Badge badgeContent={countByStatus('offer')} color="success" max={99} />} 
            iconPosition="end"
          />
          <Tab 
            label="Rejected" 
            icon={<Badge badgeContent={countByStatus('rejected')} color="error" max={99} />} 
            iconPosition="end"
          />
        </Tabs>
        
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by applicant name or job title"
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
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl fullWidth size="small">
                <InputLabel id="job-filter-label">Job</InputLabel>
                <Select
                  labelId="job-filter-label"
                  id="job-filter"
                  value={jobFilter}
                  label="Job"
                  onChange={handleJobFilterChange}
                >
                  <MenuItem value="all">All Jobs</MenuItem>
                  {jobs.map(job => (
                    <MenuItem key={job.id} value={job.id.toString()}>
                      {job.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                startIcon={<RefreshIcon />}
                onClick={() => {
                  setSearchQuery('');
                  setJobFilter('all');
                }}
              >
                Reset Filters
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
      
      <Paper elevation={1} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Applicant</TableCell>
                <TableCell>Job</TableCell>
                <TableCell>Applied On</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={application.applicantPhoto} alt={application.applicantName} sx={{ mr: 2 }} />
                        <Box>
                          <Typography variant="body1" fontWeight="medium">
                            {application.applicantName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {application.applicantEmail}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>{application.jobTitle}</TableCell>
                    <TableCell>{formatDate(application.appliedDate)}</TableCell>
                    <TableCell>{getStatusChip(application.status)}</TableCell>
                    <TableCell>
                      <Rating 
                        value={application.rating} 
                        readOnly 
                        size="small" 
                        precision={0.5}
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuOpen(event, application)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredApplications.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No applications found matching your criteria.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredApplications.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
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
          <ListItemText>View Details</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => window.location.href = `mailto:${selectedApplication?.applicantEmail}`}>
          <ListItemIcon>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Email Applicant</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleStatusChange('reviewed')} disabled={selectedApplication?.status === 'reviewed'}>
          <ListItemIcon>
            <CheckCircle fontSize="small" />
          </ListItemIcon>
          <ListItemText>Mark as Reviewed</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('interview')} disabled={selectedApplication?.status === 'interview'}>
          <ListItemIcon>
            <ScheduleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Schedule Interview</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('offer')} disabled={selectedApplication?.status === 'offer'}>
          <ListItemIcon>
            <ApproveIcon fontSize="small" color="success" />
          </ListItemIcon>
          <ListItemText>Send Offer</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleStatusChange('rejected')} disabled={selectedApplication?.status === 'rejected'}>
          <ListItemIcon>
            <RejectIcon fontSize="small" color="error" />
          </ListItemIcon>
          <ListItemText>Reject</ListItemText>
        </MenuItem>
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
              <Grid item xs={12} md={4}>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    src={selectedApplication.applicantPhoto} 
                    alt={selectedApplication.applicantName}
                    sx={{ width: 100, height: 100, mb: 2 }}
                  />
                  <Typography variant="h6" align="center">
                    {selectedApplication.applicantName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" align="center">
                    Applied for: {selectedApplication.jobTitle}
                  </Typography>
                  <Box sx={{ mt: 1 }}>
                    {getStatusChip(selectedApplication.status)}
                  </Box>
                  <Box sx={{ mt: 2 }}>
                    <Rating 
                      value={selectedApplication.rating} 
                      readOnly 
                      precision={0.5}
                    />
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Contact Information
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Email:</strong> {selectedApplication.applicantEmail}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Phone:</strong> {selectedApplication.applicantPhone}
                </Typography>
                
                <Divider sx={{ my: 2 }} />
                
                <Typography variant="subtitle2" gutterBottom>
                  Application Details
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Applied On:</strong> {formatDate(selectedApplication.appliedDate)}
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <Button 
                    variant="outlined" 
                    fullWidth 
                    sx={{ mb: 1 }}
                    href={selectedApplication.resumeUrl}
                    target="_blank"
                  >
                    View Resume
                  </Button>
                  <Button 
                    variant="outlined" 
                    fullWidth
                    href={selectedApplication.coverLetterUrl}
                    target="_blank"
                  >
                    View Cover Letter
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Typography variant="subtitle1" gutterBottom>
                  Notes
                </Typography>
                <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                  <Typography variant="body2">
                    {selectedApplication.notes || 'No notes available.'}
                  </Typography>
                </Paper>
                
                <Typography variant="subtitle1" gutterBottom>
                  Update Status
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                  <Button 
                    variant="outlined" 
                    startIcon={<CheckCircle />}
                    onClick={() => {
                      handleStatusChange('reviewed');
                      handleViewDialogClose();
                    }}
                    disabled={selectedApplication.status === 'reviewed'}
                  >
                    Mark as Reviewed
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<ScheduleIcon />}
                    onClick={() => {
                      handleStatusChange('interview');
                      handleViewDialogClose();
                    }}
                    disabled={selectedApplication.status === 'interview'}
                  >
                    Schedule Interview
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="success"
                    startIcon={<ApproveIcon />}
                    onClick={() => {
                      handleStatusChange('offer');
                      handleViewDialogClose();
                    }}
                    disabled={selectedApplication.status === 'offer'}
                  >
                    Send Offer
                  </Button>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<RejectIcon />}
                    onClick={() => {
                      handleStatusChange('rejected');
                      handleViewDialogClose();
                    }}
                    disabled={selectedApplication.status === 'rejected'}
                  >
                    Reject
                  </Button>
                </Box>
                
                <TextField
                  label="Add Notes"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Add notes about this applicant..."
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleViewDialogClose}>Close</Button>
            <Button 
              variant="contained" 
              color="primary"
              onClick={handleViewDialogClose}
            >
              Save Notes
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Container>
  );
};

export default ManageApplications;
