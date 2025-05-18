import { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Divider,
  Alert,
  CircularProgress,
  FormControlLabel,
  Checkbox,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel,
  Stepper,
  Step,
  StepLabel,
  IconButton,
  InputAdornment
} from '@mui/material';
import {
  CloudUpload as UploadIcon,
  Send as SendIcon,
  ArrowBack as BackIcon,
  ArrowForward as NextIcon,
  Close as CloseIcon,
  CheckCircle as CheckCircleIcon,
  Description as ResumeIcon,
  Email as EmailIcon
} from '@mui/icons-material';
import { ApplicationService, UserService } from '../../services';

const JobApplicationForm = ({ job, onSuccess, onCancel }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [userData, setUserData] = useState(null);
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverLetter: '',
    resumeFile: null,
    resumeUrl: '',
    useExistingResume: true,
    applyWithProfile: true,
    availableToStart: '',
    salaryExpectation: '',
    referralSource: '',
    additionalInfo: '',
    agreeToTerms: false
  });
  
  const [errors, setErrors] = useState({});
  
  // Steps for the application process
  const steps = ['Personal Information', 'Resume & Cover Letter', 'Additional Details', 'Review & Submit'];

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const userData = await UserService.getCurrentUser();
        setUserData(userData);
        
        // Pre-fill form with user data
        setFormData({
          ...formData,
          fullName: `${userData.firstName} ${userData.lastName}`,
          email: userData.email,
          phone: userData.phone || '',
          resumeUrl: userData.resume || ''
        });
      } catch (err) {
        console.error('Error fetching user data:', err);
        setError('Failed to load your profile data. Please fill in the form manually.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, []);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        resumeFile: file,
        useExistingResume: false
      });
      
      // Clear error for this field if it exists
      if (errors.resumeFile) {
        setErrors({
          ...errors,
          resumeFile: null
        });
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      // Validate personal information
      if (!formData.fullName) newErrors.fullName = 'Full name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone) newErrors.phone = 'Phone number is required';
    } else if (step === 1) {
      // Validate resume and cover letter
      if (!formData.useExistingResume && !formData.resumeFile) {
        newErrors.resumeFile = 'Please upload your resume';
      }
      if (!formData.coverLetter) newErrors.coverLetter = 'Cover letter is required';
    } else if (step === 2) {
      // Validate additional details
      if (!formData.availableToStart) newErrors.availableToStart = 'Please specify when you can start';
      if (!formData.salaryExpectation) newErrors.salaryExpectation = 'Please specify your salary expectations';
    } else if (step === 3) {
      // Validate final submission
      if (!formData.agreeToTerms) newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(activeStep)) {
      return;
    }
    
    setSubmitting(true);
    setError(null);
    
    try {
      // In a real app, you would upload the resume file to storage
      // and get a URL back, then submit the application with the URL
      
      // For now, we'll simulate this process
      let resumeUrl = formData.resumeUrl;
      
      if (formData.resumeFile && !formData.useExistingResume) {
        // Simulate file upload
        console.log('Uploading resume file:', formData.resumeFile.name);
        // In a real app, you would upload the file and get a URL
        resumeUrl = URL.createObjectURL(formData.resumeFile);
      }
      
      // Submit application
      const applicationData = {
        jobId: job.id,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        coverLetter: formData.coverLetter,
        resumeUrl: resumeUrl,
        availableToStart: formData.availableToStart,
        salaryExpectation: formData.salaryExpectation,
        referralSource: formData.referralSource,
        additionalInfo: formData.additionalInfo
      };
      
      const result = await ApplicationService.submitApplication(applicationData);
      
      setSuccess(true);
      
      // Call onSuccess callback after a delay
      setTimeout(() => {
        if (onSuccess) onSuccess(result);
      }, 2000);
    } catch (err) {
      console.error('Error submitting application:', err);
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Render step content based on active step
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Personal Information
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please provide your contact information.
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Grid>
            
            {userData && (
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.applyWithProfile}
                      onChange={handleInputChange}
                      name="applyWithProfile"
                    />
                  }
                  label="Use my profile information for this application"
                />
                <Typography variant="caption" color="text.secondary">
                  Your profile information will be shared with the employer.
                </Typography>
              </Grid>
            )}
          </Grid>
        );
      
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Resume & Cover Letter
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Upload your resume and write a cover letter to introduce yourself.
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Resume
                </Typography>
                
                {formData.resumeUrl && (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={formData.useExistingResume}
                        onChange={handleInputChange}
                        name="useExistingResume"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ResumeIcon sx={{ mr: 1 }} />
                        <Typography variant="body2">
                          Use my existing resume
                        </Typography>
                      </Box>
                    }
                  />
                )}
                
                {(!formData.resumeUrl || !formData.useExistingResume) && (
                  <Box sx={{ mt: 2 }}>
                    <input
                      accept=".pdf,.doc,.docx"
                      style={{ display: 'none' }}
                      id="resume-file"
                      type="file"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="resume-file">
                      <Button
                        variant="outlined"
                        component="span"
                        startIcon={<UploadIcon />}
                      >
                        Upload Resume
                      </Button>
                    </label>
                    {formData.resumeFile && (
                      <Typography variant="body2" sx={{ mt: 1 }}>
                        Selected file: {formData.resumeFile.name}
                      </Typography>
                    )}
                    {errors.resumeFile && (
                      <Typography variant="caption" color="error">
                        {errors.resumeFile}
                      </Typography>
                    )}
                  </Box>
                )}
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Cover Letter
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={8}
                placeholder="Write a cover letter to introduce yourself and explain why you're a good fit for this position..."
                name="coverLetter"
                value={formData.coverLetter}
                onChange={handleInputChange}
                required
                error={!!errors.coverLetter}
                helperText={errors.coverLetter}
              />
            </Grid>
          </Grid>
        );
      
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Additional Details
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please provide some additional information to help the employer evaluate your application.
              </Typography>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="When can you start?"
                name="availableToStart"
                value={formData.availableToStart}
                onChange={handleInputChange}
                placeholder="e.g., Immediately, 2 weeks notice, etc."
                required
                error={!!errors.availableToStart}
                helperText={errors.availableToStart}
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Salary Expectations"
                name="salaryExpectation"
                value={formData.salaryExpectation}
                onChange={handleInputChange}
                placeholder="e.g., $70,000 - $80,000"
                required
                error={!!errors.salaryExpectation}
                helperText={errors.salaryExpectation}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="How did you hear about this job?"
                name="referralSource"
                value={formData.referralSource}
                onChange={handleInputChange}
                placeholder="e.g., Job board, referral, company website, etc."
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Additional Information"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                multiline
                rows={4}
                placeholder="Any additional information you'd like to share with the employer..."
              />
            </Grid>
          </Grid>
        );
      
      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Review Your Application
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Please review your application before submitting.
              </Typography>
            </Grid>
            
            <Grid item xs={12}>
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Job Details
                </Typography>
                <Typography variant="body1" fontWeight="medium">
                  {job.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {job.company} • {job.location}
                </Typography>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Personal Information
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Full Name
                    </Typography>
                    <Typography variant="body1">
                      {formData.fullName}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Email
                    </Typography>
                    <Typography variant="body1">
                      {formData.email}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Typography variant="body2" color="text.secondary">
                      Phone
                    </Typography>
                    <Typography variant="body1">
                      {formData.phone}
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Resume & Cover Letter
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Resume
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  {formData.useExistingResume && formData.resumeUrl ? 'Using existing resume' : formData.resumeFile ? formData.resumeFile.name : 'No resume uploaded'}
                </Typography>
                
                <Typography variant="body2" color="text.secondary">
                  Cover Letter
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {formData.coverLetter}
                </Typography>
              </Paper>
              
              <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Details
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Available to Start
                    </Typography>
                    <Typography variant="body1">
                      {formData.availableToStart}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="body2" color="text.secondary">
                      Salary Expectation
                    </Typography>
                    <Typography variant="body1">
                      {formData.salaryExpectation}
                    </Typography>
                  </Grid>
                  {formData.referralSource && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Referral Source
                      </Typography>
                      <Typography variant="body1">
                        {formData.referralSource}
                      </Typography>
                    </Grid>
                  )}
                  {formData.additionalInfo && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        Additional Information
                      </Typography>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                        {formData.additionalInfo}
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Paper>
              
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    name="agreeToTerms"
                    required
                  />
                }
                label="I confirm that the information provided is accurate and complete."
              />
              {errors.agreeToTerms && (
                <Typography variant="caption" color="error" display="block">
                  {errors.agreeToTerms}
                </Typography>
              )}
            </Grid>
          </Grid>
        );
      
      default:
        return 'Unknown step';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 4 }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h5" gutterBottom>
          Application Submitted Successfully!
        </Typography>
        <Typography variant="body1" paragraph>
          Your application for {job.title} at {job.company} has been submitted.
        </Typography>
        <Typography variant="body2" color="text.secondary" paragraph>
          You will receive a confirmation email shortly.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onSuccess}
        >
          View My Applications
        </Button>
      </Box>
    );
  }

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2">
          Apply for {job.title}
        </Typography>
        <IconButton onClick={onCancel}>
          <CloseIcon />
        </IconButton>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      
      <Box>
        {getStepContent(activeStep)}
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            startIcon={<BackIcon />}
          >
            Back
          </Button>
          
          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={submitting}
              startIcon={submitting ? <CircularProgress size={20} /> : <SendIcon />}
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={<NextIcon />}
            >
              Next
            </Button>
          )}
        </Box>
      </Box>
    </Paper>
  );
};

export default JobApplicationForm;
