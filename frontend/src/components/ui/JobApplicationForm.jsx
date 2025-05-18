import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Stepper,
  Step,
  StepLabel,
  FormControlLabel,
  Checkbox,
  Divider,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import JobService from '../../services/jobService';

const steps = ['Personal Information', 'Resume & Cover Letter', 'Additional Information', 'Review & Submit'];

const JobApplicationForm = ({ jobId, jobTitle, companyName, onSuccess, onCancel }) => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    phone: currentUser?.phone || '',
    resume: null,
    coverLetter: '',
    skills: [],
    experience: '',
    education: '',
    availability: 'immediate',
    relocate: false,
    salary: '',
    references: [],
    additionalInfo: ''
  });
  const [skillInput, setSkillInput] = useState('');
  const [referenceInput, setReferenceInput] = useState({
    name: '',
    company: '',
    position: '',
    phone: '',
    email: ''
  });
  const [referenceDialogOpen, setReferenceDialogOpen] = useState(false);
  const [referenceError, setReferenceError] = useState({});

  useEffect(() => {
    // Pre-fill form with user data if available
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        firstName: currentUser.firstName || prev.firstName,
        lastName: currentUser.lastName || prev.lastName,
        email: currentUser.email || prev.email,
        phone: currentUser.phone || prev.phone
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resume: file
      });
    }
  };

  const handleSkillAdd = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const handleSkillRemove = (skill) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(s => s !== skill)
    });
  };

  const handleReferenceInputChange = (e) => {
    const { name, value } = e.target;
    setReferenceInput({
      ...referenceInput,
      [name]: value
    });
    // Clear error when user types
    if (referenceError[name]) {
      setReferenceError({
        ...referenceError,
        [name]: ''
      });
    }
  };

  const validateReference = () => {
    const errors = {};
    if (!referenceInput.name) errors.name = 'Name is required';
    if (!referenceInput.email) errors.email = 'Email is required';
    if (referenceInput.email && !/\S+@\S+\.\S+/.test(referenceInput.email)) {
      errors.email = 'Email is invalid';
    }
    
    setReferenceError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleReferenceAdd = () => {
    if (validateReference()) {
      setFormData({
        ...formData,
        references: [...formData.references, { ...referenceInput }]
      });
      setReferenceInput({
        name: '',
        company: '',
        position: '',
        phone: '',
        email: ''
      });
      setReferenceDialogOpen(false);
    }
  };

  const handleReferenceRemove = (index) => {
    setFormData({
      ...formData,
      references: formData.references.filter((_, i) => i !== index)
    });
  };

  const handleNext = () => {
    if (validateStep()) {
      if (activeStep === steps.length - 1) {
        handleSubmit();
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const validateStep = () => {
    setError(null);
    
    switch (activeStep) {
      case 0: // Personal Information
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
          setError('Please fill in all required fields');
          return false;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
          setError('Please enter a valid email address');
          return false;
        }
        if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
          setError('Please enter a valid 10-digit phone number');
          return false;
        }
        break;
      
      case 1: // Resume & Cover Letter
        if (!formData.resume) {
          setError('Please upload your resume');
          return false;
        }
        if (!formData.coverLetter.trim()) {
          setError('Please provide a cover letter');
          return false;
        }
        break;
      
      case 2: // Additional Information
        if (formData.skills.length === 0) {
          setError('Please add at least one skill');
          return false;
        }
        break;
      
      default:
        break;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Create FormData object for file upload
      const applicationData = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'resume') {
          applicationData.append('resume', formData.resume);
        } else if (key === 'skills') {
          applicationData.append('skills', JSON.stringify(formData.skills));
        } else if (key === 'references') {
          applicationData.append('references', JSON.stringify(formData.references));
        } else {
          applicationData.append(key, formData[key]);
        }
      });
      
      // Submit application
      await JobService.applyForJob(jobId, applicationData);
      
      setSuccess(true);
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Personal Information
        return (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                fullWidth
                required
                placeholder="(123) 456-7890"
              />
            </Grid>
          </Grid>
        );
      
      case 1: // Resume & Cover Letter
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                  Resume
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    sx={{ mr: 2 }}
                  >
                    Upload Resume
                    <input
                      type="file"
                      hidden
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileChange}
                    />
                  </Button>
                  {formData.resume && (
                    <Typography variant="body2">
                      {formData.resume.name}
                    </Typography>
                  )}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Accepted formats: PDF, DOC, DOCX. Max size: 5MB
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Cover Letter"
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleChange}
                multiline
                rows={8}
                fullWidth
                required
                placeholder="Explain why you're a good fit for this position..."
              />
            </Grid>
          </Grid>
        );
      
      case 2: // Additional Information
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                Skills
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                  label="Add a skill"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSkillAdd()}
                  sx={{ mr: 1, flexGrow: 1 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSkillAdd}
                  disabled={!skillInput.trim()}
                >
                  Add
                </Button>
              </Box>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
                {formData.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => handleSkillRemove(skill)}
                  />
                ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Work Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                placeholder="Briefly describe your relevant work experience..."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Education"
                name="education"
                value={formData.education}
                onChange={handleChange}
                multiline
                rows={3}
                fullWidth
                placeholder="List your educational background..."
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Expected Salary"
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                fullWidth
                placeholder="e.g. $60,000 - $80,000"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.relocate}
                    onChange={handleChange}
                    name="relocate"
                  />
                }
                label="I am willing to relocate if necessary"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
                References
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<AddIcon />}
                  onClick={() => setReferenceDialogOpen(true)}
                >
                  Add Reference
                </Button>
              </Box>
              {formData.references.length > 0 ? (
                <Grid container spacing={2}>
                  {formData.references.map((reference, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Paper sx={{ p: 2, position: 'relative' }}>
                        <IconButton
                          size="small"
                          sx={{ position: 'absolute', top: 8, right: 8 }}
                          onClick={() => handleReferenceRemove(index)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                        <Typography variant="subtitle2">{reference.name}</Typography>
                        <Typography variant="body2">{reference.position}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {reference.company}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {reference.email}
                        </Typography>
                        {reference.phone && (
                          <Typography variant="body2" color="text.secondary">
                            {reference.phone}
                          </Typography>
                        )}
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  No references added yet.
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      
      case 3: // Review & Submit
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Review Your Application
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Please review your application details before submitting.
            </Typography>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    {formData.firstName} {formData.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">{formData.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">{formData.phone}</Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Resume & Cover Letter
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Resume
                  </Typography>
                  <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                    <CheckIcon color="success" fontSize="small" sx={{ mr: 1 }} />
                    {formData.resume?.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Cover Letter Preview
                  </Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                    {formData.coverLetter.length > 200
                      ? `${formData.coverLetter.substring(0, 200)}...`
                      : formData.coverLetter}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
            
            <Paper sx={{ p: 3 }}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                Skills & Additional Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="body2" color="text.secondary">
                    Skills
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, my: 1 }}>
                    {formData.skills.map((skill) => (
                      <Chip key={skill} label={skill} size="small" />
                    ))}
                  </Box>
                </Grid>
                {formData.experience && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Work Experience
                    </Typography>
                    <Typography variant="body1">
                      {formData.experience.length > 100
                        ? `${formData.experience.substring(0, 100)}...`
                        : formData.experience}
                    </Typography>
                  </Grid>
                )}
                {formData.education && (
                  <Grid item xs={12}>
                    <Typography variant="body2" color="text.secondary">
                      Education
                    </Typography>
                    <Typography variant="body1">
                      {formData.education.length > 100
                        ? `${formData.education.substring(0, 100)}...`
                        : formData.education}
                    </Typography>
                  </Grid>
                )}
                {formData.salary && (
                  <Grid item xs={12} sm={6}>
                    <Typography variant="body2" color="text.secondary">
                      Expected Salary
                    </Typography>
                    <Typography variant="body1">{formData.salary}</Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" color="text.secondary">
                    Willing to Relocate
                  </Typography>
                  <Typography variant="body1">
                    {formData.relocate ? 'Yes' : 'No'}
                  </Typography>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      
      default:
        return null;
    }
  };

  // Reference Dialog
  const renderReferenceDialog = () => (
    <Dialog
      open={referenceDialogOpen}
      onClose={() => setReferenceDialogOpen(false)}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Reference</DialogTitle>
      <DialogContent>
        <Grid container spacing={2} sx={{ mt: 0.5 }}>
          <Grid item xs={12}>
            <TextField
              label="Name"
              name="name"
              value={referenceInput.name}
              onChange={handleReferenceInputChange}
              fullWidth
              required
              error={!!referenceError.name}
              helperText={referenceError.name}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Company"
              name="company"
              value={referenceInput.company}
              onChange={handleReferenceInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Position"
              name="position"
              value={referenceInput.position}
              onChange={handleReferenceInputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Email"
              name="email"
              type="email"
              value={referenceInput.email}
              onChange={handleReferenceInputChange}
              fullWidth
              required
              error={!!referenceError.email}
              helperText={referenceError.email}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Phone"
              name="phone"
              value={referenceInput.phone}
              onChange={handleReferenceInputChange}
              fullWidth
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setReferenceDialogOpen(false)}>Cancel</Button>
        <Button onClick={handleReferenceAdd} variant="contained" color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CheckIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Application Submitted Successfully!
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Your application for {jobTitle} at {companyName} has been submitted.
          We'll notify you when there are updates.
        </Typography>
        <Button variant="contained" color="primary" onClick={onSuccess}>
          Back to Job Search
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Apply for {jobTitle}
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        {companyName}
      </Typography>
      
      <Stepper activeStep={activeStep} sx={{ mb: 4, mt: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {renderStepContent(activeStep)}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
        <Button
          onClick={onCancel}
          sx={{ mr: 1 }}
          disabled={loading}
        >
          Cancel
        </Button>
        <Box>
          <Button
            disabled={activeStep === 0 || loading}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={loading}
            startIcon={loading && <CircularProgress size={20} />}
          >
            {activeStep === steps.length - 1 ? 'Submit Application' : 'Next'}
          </Button>
        </Box>
      </Box>
      
      {renderReferenceDialog()}
    </Box>
  );
};

export default JobApplicationForm;
