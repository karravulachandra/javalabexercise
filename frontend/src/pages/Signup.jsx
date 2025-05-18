import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  Grid,
  Stepper,
  Step,
  StepLabel,
  Radio,
  RadioGroup,
  FormControl,
  FormLabel
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon,
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon
} from '@mui/icons-material';

const steps = ['Account Type', 'Personal Information', 'Account Details', 'Confirmation'];

const Signup = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { register, error: authError, loading: authLoading } = useAuth();

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    accountType: 'jobseeker',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    company: '',
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [signupError, setSignupError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'agreeToTerms' ? checked : value
    });

    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateStep = () => {
    const newErrors = {};

    if (activeStep === 0) {
      if (!formData.accountType) {
        newErrors.accountType = 'Please select an account type';
      }
    } else if (activeStep === 1) {
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
      } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = 'Please enter a valid phone number';
      }
      if (!formData.company) {
        newErrors.company = 'Company/Institute name is required';
      }
    } else if (activeStep === 2) {
      if (!formData.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }

      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (formData.password.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }

      if (!formData.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms and conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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

  // Handle reCAPTCHA verification
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  // Effect to set error message from auth context
  useEffect(() => {
    if (authError) {
      setSignupError(authError);
      setIsSubmitting(false);
    }
  }, [authError]);

  // Effect to redirect to login page after successful registration
  useEffect(() => {
    if (registrationComplete) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [registrationComplete, navigate]);

  const handleSubmit = async () => {
    setSignupError('');

    if (!captchaVerified) {
      setSignupError('Please verify that you are not a robot');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        company: formData.company,
        accountType: formData.accountType
      });

      // Show success message and set flag for redirect
      setSignupError('');
      setRegistrationComplete(true);
    } catch (error) {
      console.error('Registration error:', error);
      setSignupError(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSocialSignup = (provider) => {
    // For now, just show an error message
    setSignupError(`${provider} signup is not implemented yet`);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset">
              <FormLabel component="legend" sx={{ mb: 2, fontWeight: 500 }}>
                I want to:
              </FormLabel>
              <RadioGroup
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
              >
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    mb: 2,
                    borderColor: formData.accountType === 'jobseeker' ? 'primary.main' : 'grey.300',
                    borderWidth: formData.accountType === 'jobseeker' ? 2 : 1,
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => setFormData({ ...formData, accountType: 'jobseeker' })}
                >
                  <FormControlLabel
                    value="jobseeker"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Find a Job
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          I'm looking for work opportunities
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Paper>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    borderColor: formData.accountType === 'employer' ? 'primary.main' : 'grey.300',
                    borderWidth: formData.accountType === 'employer' ? 2 : 1,
                    borderRadius: 2,
                    cursor: 'pointer'
                  }}
                  onClick={() => setFormData({ ...formData, accountType: 'employer' })}
                >
                  <FormControlLabel
                    value="employer"
                    control={<Radio />}
                    label={
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          Post a Job
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          I'm hiring and want to post jobs
                        </Typography>
                      </Box>
                    }
                    sx={{ m: 0 }}
                  />
                </Paper>
              </RadioGroup>
              {errors.accountType && (
                <Typography color="error" variant="caption" sx={{ mt: 1 }}>
                  {errors.accountType}
                </Typography>
              )}
            </FormControl>
          </Box>
        );

      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Company/Institute Name"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  error={!!errors.company}
                  helperText={errors.company}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={togglePasswordVisibility}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              fullWidth
              label="Confirm Password"
              name="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              margin="normal"
              required
            />

            {/* reCAPTCHA */}
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
                onChange={handleCaptchaChange}
              />
            </Box>

            <FormControlLabel
              control={
                <Checkbox
                  name="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  color="primary"
                />
              }
              label={
                <Typography variant="body2">
                  I agree to the{' '}
                  <Link to="/terms" style={{ textDecoration: 'none' }}>
                    <Typography component="span" color="primary" variant="body2">
                      Terms of Service
                    </Typography>
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" style={{ textDecoration: 'none' }}>
                    <Typography component="span" color="primary" variant="body2">
                      Privacy Policy
                    </Typography>
                  </Link>
                </Typography>
              }
              sx={{ mt: 2 }}
            />
            {errors.agreeToTerms && (
              <Typography color="error" variant="caption" display="block">
                {errors.agreeToTerms}
              </Typography>
            )}
          </Box>
        );

      case 3:
        return (
          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Almost there!
            </Typography>
            <Typography variant="body1" paragraph>
              Please review your information before creating your account.
            </Typography>

            <Box sx={{ mt: 2, mb: 4, textAlign: 'left', p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Account Type
                  </Typography>
                  <Typography variant="body1">
                    {formData.accountType === 'jobseeker' ? 'Job Seeker' : 'Employer'}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Name
                  </Typography>
                  <Typography variant="body1">
                    {formData.firstName} {formData.lastName}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1">
                    {formData.email}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1">
                    {formData.phone}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Company/Institute
                  </Typography>
                  <Typography variant="body1">
                    {formData.company}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
        backgroundColor: 'grey.50'
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            borderRadius: 2,
            boxShadow: '0 8px 24px rgba(0,0,0,0.05)'
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                textDecoration: 'none',
                display: 'inline-block',
                mb: 1
              }}
            >
              TopHire
            </Typography>
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Create Your Account
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Join our community and start your journey
            </Typography>
          </Box>

          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{!isMobile && label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <ErrorMessage
            message={signupError}
            severity="error"
            autoDismiss={5000}
            onClose={() => setSignupError('')}
          />

          <ErrorMessage
            message={registrationComplete ? "Registration successful! You will be redirected to the login page in a few seconds." : ""}
            severity="success"
          />

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              endIcon={activeStep === steps.length - 1 ? null : <ArrowForwardIcon />}
              disabled={isSubmitting || authLoading || registrationComplete}
            >
              {isSubmitting || authLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                activeStep === steps.length - 1 ? 'Create Account' : 'Next'
              )}
            </Button>
          </Box>

          {activeStep === 0 && (
            <>
              <Divider sx={{ my: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  OR
                </Typography>
              </Divider>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={() => handleSocialSignup('Google')}
                    sx={{ borderRadius: 2 }}
                  >
                    Sign up with Google
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkedInIcon />}
                    onClick={() => handleSocialSignup('LinkedIn')}
                    sx={{ borderRadius: 2 }}
                  >
                    Sign up with LinkedIn
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<FacebookIcon />}
                    onClick={() => handleSocialSignup('Facebook')}
                    sx={{ borderRadius: 2 }}
                  >
                    Sign up with Facebook
                  </Button>
                </Grid>
              </Grid>

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Typography variant="body2" color="text.secondary">
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography
                      variant="body2"
                      component="span"
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    >
                      Sign in
                    </Typography>
                  </Link>
                </Typography>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  );
};



export default Signup;
