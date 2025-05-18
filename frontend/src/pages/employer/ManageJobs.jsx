import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Select
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as DuplicateIcon,
  Visibility as ViewIcon,
  MoreVert as MoreVertIcon,
  Search as SearchIcon,
  FilterList as FilterIcon,
  Refresh as RefreshIcon,
  PauseCircleOutline as PauseIcon,
  PlayCircleOutline as ResumeIcon
} from '@mui/icons-material';

const ManageJobs = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedJob, setSelectedJob] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  // Mock jobs data
  const [jobs, setJobs] = useState([
    {
      id: 1,
      title: 'Senior Frontend Developer',
      location: 'New York, NY',
      department: 'Engineering',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-01',
      expiresOn: '2023-06-01',
      applications: 42,
      views: 312
    },
    {
      id: 2,
      title: 'UX Designer',
      location: 'Remote',
      department: 'Design',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-03',
      expiresOn: '2023-06-03',
      applications: 38,
      views: 287
    },
    {
      id: 3,
      title: 'Backend Developer',
      location: 'San Francisco, CA',
      department: 'Engineering',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-05',
      expiresOn: '2023-06-05',
      applications: 31,
      views: 245
    },
    {
      id: 4,
      title: 'Product Manager',
      location: 'Chicago, IL',
      department: 'Product',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-07',
      expiresOn: '2023-06-07',
      applications: 27,
      views: 198
    },
    {
      id: 5,
      title: 'DevOps Engineer',
      location: 'Austin, TX',
      department: 'Engineering',
      type: 'Full-time',
      status: 'paused',
      datePosted: '2023-05-10',
      expiresOn: '2023-06-10',
      applications: 23,
      views: 176
    },
    {
      id: 6,
      title: 'Marketing Specialist',
      location: 'Remote',
      department: 'Marketing',
      type: 'Full-time',
      status: 'expired',
      datePosted: '2023-04-01',
      expiresOn: '2023-05-01',
      applications: 35,
      views: 267
    },
    {
      id: 7,
      title: 'Data Scientist',
      location: 'Boston, MA',
      department: 'Data',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-12',
      expiresOn: '2023-06-12',
      applications: 19,
      views: 156
    },
    {
      id: 8,
      title: 'HR Manager',
      location: 'Seattle, WA',
      department: 'Human Resources',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-14',
      expiresOn: '2023-06-14',
      applications: 15,
      views: 132
    },
    {
      id: 9,
      title: 'Content Writer',
      location: 'Remote',
      department: 'Marketing',
      type: 'Part-time',
      status: 'paused',
      datePosted: '2023-05-15',
      expiresOn: '2023-06-15',
      applications: 28,
      views: 201
    },
    {
      id: 10,
      title: 'Sales Representative',
      location: 'Miami, FL',
      department: 'Sales',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-16',
      expiresOn: '2023-06-16',
      applications: 22,
      views: 187
    },
    {
      id: 11,
      title: 'Customer Support Specialist',
      location: 'Remote',
      department: 'Support',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-17',
      expiresOn: '2023-06-17',
      applications: 31,
      views: 224
    },
    {
      id: 12,
      title: 'Junior Web Developer',
      location: 'Denver, CO',
      department: 'Engineering',
      type: 'Full-time',
      status: 'active',
      datePosted: '2023-05-18',
      expiresOn: '2023-06-18',
      applications: 45,
      views: 356
    }
  ]);

  // Handle menu open
  const handleMenuOpen = (event, job) => {
    setAnchorEl(event.currentTarget);
    setSelectedJob(job);
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

  // Handle status filter change
  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  // Handle delete dialog open
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  // Handle delete dialog close
  const handleDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  // Handle job deletion
  const handleDeleteJob = () => {
    if (selectedJob) {
      // In a real app, this would call an API to delete the job
      setJobs(jobs.filter(job => job.id !== selectedJob.id));
      setSuccessMessage(`Job "${selectedJob.title}" has been deleted.`);
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
    }
    setDeleteDialogOpen(false);
  };

  // Handle job status toggle (pause/resume)
  const handleToggleJobStatus = (job) => {
    const updatedJobs = jobs.map(j => {
      if (j.id === job.id) {
        const newStatus = j.status === 'active' ? 'paused' : 'active';
        return { ...j, status: newStatus };
      }
      return j;
    });
    
    setJobs(updatedJobs);
    setSuccessMessage(`Job "${job.title}" has been ${job.status === 'active' ? 'paused' : 'resumed'}.`);
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 3000);
    
    handleMenuClose();
  };

  // Filter jobs based on search query and status filter
  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'paused':
        return 'warning';
      case 'expired':
        return 'error';
      default:
        return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Manage Jobs
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          component={Link}
          to="/employer/jobs/new"
        >
          Post New Job
        </Button>
      </Box>
      
      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}
      
      <Paper elevation={1} sx={{ mb: 3, p: 2, borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search jobs by title, location, or department"
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
              <InputLabel id="status-filter-label">Status</InputLabel>
              <Select
                labelId="status-filter-label"
                id="status-filter"
                value={statusFilter}
                label="Status"
                onChange={handleStatusFilterChange}
              >
                <MenuItem value="all">All Statuses</MenuItem>
                <MenuItem value="active">Active</MenuItem>
                <MenuItem value="paused">Paused</MenuItem>
                <MenuItem value="expired">Expired</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              startIcon={<RefreshIcon />}
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
              }}
            >
              Reset Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      <Paper elevation={1} sx={{ borderRadius: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Job Title</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Posted On</TableCell>
                <TableCell>Expires</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Applications</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredJobs
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((job) => (
                  <TableRow key={job.id}>
                    <TableCell component="th" scope="row">
                      <Typography variant="body1" fontWeight="medium">
                        {job.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {job.type}
                      </Typography>
                    </TableCell>
                    <TableCell>{job.location}</TableCell>
                    <TableCell>{job.department}</TableCell>
                    <TableCell>{formatDate(job.datePosted)}</TableCell>
                    <TableCell>{formatDate(job.expiresOn)}</TableCell>
                    <TableCell>
                      <Chip 
                        label={job.status.charAt(0).toUpperCase() + job.status.slice(1)} 
                        color={getStatusColor(job.status)} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="View applications">
                        <Button
                          size="small"
                          component={Link}
                          to={`/employer/applications?jobId=${job.id}`}
                        >
                          {job.applications}
                        </Button>
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(event) => handleMenuOpen(event, job)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              {filteredJobs.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} align="center" sx={{ py: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No jobs found matching your criteria.
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
          count={filteredJobs.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      
      {/* Job Actions Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to={`/jobs/${selectedJob?.id}`} onClick={handleMenuClose}>
          <ListItemIcon>
            <ViewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>View Job</ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={`/employer/jobs/edit/${selectedJob?.id}`} onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Edit Job</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => selectedJob && handleToggleJobStatus(selectedJob)}>
          <ListItemIcon>
            {selectedJob?.status === 'active' ? (
              <PauseIcon fontSize="small" />
            ) : (
              <ResumeIcon fontSize="small" />
            )}
          </ListItemIcon>
          <ListItemText>
            {selectedJob?.status === 'active' ? 'Pause Job' : 'Resume Job'}
          </ListItemText>
        </MenuItem>
        <MenuItem component={Link} to={`/employer/jobs/duplicate/${selectedJob?.id}`} onClick={handleMenuClose}>
          <ListItemIcon>
            <DuplicateIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Duplicate Job</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleDeleteDialogOpen} sx={{ color: 'error.main' }}>
          <ListItemIcon sx={{ color: 'error.main' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Delete Job</ListItemText>
        </MenuItem>
      </Menu>
      
      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteDialogClose}
      >
        <DialogTitle>Delete Job</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the job "{selectedJob?.title}"? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose}>Cancel</Button>
          <Button onClick={handleDeleteJob} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ManageJobs;
