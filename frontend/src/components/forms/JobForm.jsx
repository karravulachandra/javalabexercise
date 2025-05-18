import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Divider,
  Alert,
  CircularProgress,
  InputAdornment,
  FormHelperText,
  Autocomplete
} from '@mui/material';
import {
  Save as SaveIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { JobService, CompanyService } from '../../services';

const JobForm = ({ jobId, onSubmitSuccess }) => {
  const navigate = useNavigate();
  const isEditMode = !!jobId;
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    requirements: '',
    company: '',
    companyId: '',
    location: '',
    salary: '',
    jobType: 'Full-time',
    category: '',
    skills: [],
    experienceLevel: 'Entry-level',
    educationLevel: "Bachelor's Degree",
    applicationDeadline: '',
    isRemote: false,
    isFeatured: false
  });
  
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [skillInput, setSkillInput] = useState('');
  const [errors, setErrors] = useState({});
  
  // Job types
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'];
  
  // Experience levels
  const experienceLevels = ['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Manager', 'Executive'];
  
  // Education levels
  const educationLevels = ['High School', 'Associate Degree', "Bachelor's Degree", "Master's Degree", 'PhD', 'No Requirement'];
  
  // Categories
  const categories = [
    'Software Development',
    'Design',
    'Marketing',
    'Sales',
    'Customer Service',
    'Finance',
    'Human Resources',
    'Engineering',
    'Product Management',
    'Data Science',
    'Operations',
    'Administrative'
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch companies for dropdown
        const companiesData = await CompanyService.getCompanies();
        setCompanies(companiesData.companies || []);
        
        // If in edit mode, fetch job details
        if (isEditMode) {
          const jobData = await JobService.getJobById(jobId);
          
          // Format the data for the form
          setFormData({
            title: jobData.title || '',
            description: jobData.description || '',
            requirements: jobData.requirements || '',
            company: jobData.company || '',
            companyId: jobData.companyId || '',
            location: jobData.location || '',
            salary: jobData.salary || '',
            jobType: jobData.jobType || 'Full-time',
            category: jobData.category || '',
            skills: jobData.skills || [],
            experienceLevel: jobData.experienceLevel || 'Entry-level',
            educationLevel: jobData.educationLevel || "Bachelor's Degree",
            applicationDeadline: jobData.applicationDeadline ? new Date(jobData.applicationDeadline).toISOString().split('T')[0] : '',
            isRemote: jobData.isRemote || false,
            isFeatured: jobData.isFeatured || false
          });
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [jobId, isEditMode]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error for this field if it exists
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const handleCompanyChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      // User entered a string
      setFormData({
        ...formData,
        company: newValue,
        companyId: ''
      });
    } else if (newValue && newValue.id) {
      // User selected a company from the dropdown
      setFormData({
        ...formData,
        company: newValue.name,
        companyId: newValue.id
      });
    } else {
      // Cleared the selection
      setFormData({
        ...formData,
        company: '',
        companyId: ''
      });
    }
  };

  const handleAddSkill = () => {
    if (skillInput && !formData.skills.includes(skillInput)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput]
      });
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title) newErrors.title = 'Job title is required';
    if (!formData.description) newErrors.description = 'Job description is required';
    if (!formData.company) newErrors.company = 'Company is required';
    if (!formData.location) newErrors.location = 'Location is required';
    if (!formData.salary) newErrors.salary = 'Salary information is required';
    if (!formData.jobType) newErrors.jobType = 'Job type is required';
    if (!formData.category) newErrors.category = 'Job category is required';
    if (formData.skills.length === 0) newErrors.skills = 'At least one skill is required';
    if (!formData.applicationDeadline) newErrors.applicationDeadline = 'Application deadline is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    setSuccess(false);
    
    try {
      if (isEditMode) {
        // Update existing job
        await JobService.updateJob(jobId, formData);
        setSuccess(true);
        setTimeout(() => {
          if (onSubmitSuccess) onSubmitSuccess();
          else navigate('/employer/jobs');
        }, 2000);
      } else {
        // Create new job
        const result = await JobService.createJob(formData);
        setSuccess(true);
        setTimeout(() => {
          if (onSubmitSuccess) onSubmitSuccess(result.job);
          else navigate('/employer/jobs');
        }, 2000);
      }
    } catch (err) {
      console.error('Error submitting job:', err);
      setError(err.message || 'Failed to submit job. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        {isEditMode ? 'Edit Job' : 'Post a New Job'}
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {success && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Job {isEditMode ? 'updated' : 'created'} successfully!
        </Alert>
      )}
      
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          {/* Job Title */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              error={!!errors.title}
              helperText={errors.title}
            />
          </Grid>
          
          {/* Company */}
          <Grid item xs={12} md={6}>
            <Autocomplete
              options={companies}
              getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
              value={formData.companyId ? companies.find(c => c.id === formData.companyId) : null}
              onChange={handleCompanyChange}
              freeSolo
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Company"
                  name="company"
                  required
                  error={!!errors.company}
                  helperText={errors.company}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      company: e.target.value,
                      companyId: ''
                    });
                  }}
                />
              )}
            />
          </Grid>
          
          {/* Location */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
              error={!!errors.location}
              helperText={errors.location}
            />
          </Grid>
          
          {/* Salary */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Salary"
              name="salary"
              value={formData.salary}
              onChange={handleInputChange}
              placeholder="e.g. $50K - $70K"
              required
              error={!!errors.salary}
              helperText={errors.salary}
            />
          </Grid>
          
          {/* Job Type */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors.jobType}>
              <InputLabel>Job Type</InputLabel>
              <Select
                name="jobType"
                value={formData.jobType}
                onChange={handleInputChange}
                label="Job Type"
              >
                {jobTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
              {errors.jobType && <FormHelperText>{errors.jobType}</FormHelperText>}
            </FormControl>
          </Grid>
          
          {/* Category */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth required error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                label="Category"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
            </FormControl>
          </Grid>
          
          {/* Experience Level */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Experience Level</InputLabel>
              <Select
                name="experienceLevel"
                value={formData.experienceLevel}
                onChange={handleInputChange}
                label="Experience Level"
              >
                {experienceLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Education Level */}
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Education Level</InputLabel>
              <Select
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                label="Education Level"
              >
                {educationLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          {/* Application Deadline */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Application Deadline"
              name="applicationDeadline"
              type="date"
              value={formData.applicationDeadline}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
              required
              error={!!errors.applicationDeadline}
              helperText={errors.applicationDeadline}
            />
          </Grid>
          
          {/* Skills */}
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Skills Required
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                label="Add Skills"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillInputKeyDown}
                error={!!errors.skills}
                helperText={errors.skills}
                sx={{ mr: 1 }}
              />
              <Button
                variant="contained"
                onClick={handleAddSkill}
                startIcon={<AddIcon />}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                />
              ))}
            </Box>
          </Grid>
          
          {/* Description */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={6}
              required
              error={!!errors.description}
              helperText={errors.description}
            />
          </Grid>
          
          {/* Requirements */}
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Job Requirements"
              name="requirements"
              value={formData.requirements}
              onChange={handleInputChange}
              multiline
              rows={4}
            />
          </Grid>
          
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => navigate('/employer/jobs')}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disabled={submitting}
              >
                {submitting ? 'Submitting...' : isEditMode ? 'Update Job' : 'Post Job'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default JobForm;
