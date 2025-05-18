import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import ErrorMessage from '../components/common/ErrorMessage';
import {
  Box,
  Container,
  Typography,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Alert,
  Grid
} from '@mui/material';
import {
  AnimatedButton,
  AnimatedCard,
  AnimatedInput,
  PageTransition,
  LoadingSpinner,
  PreloadingScreen
} from '../components/ui';
import {
  Visibility as VisibilityIcon,
  VisibilityOff as VisibilityOffIcon,
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon,
  Facebook as FacebookIcon
} from '@mui/icons-material';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, error: authError, loading: authLoading } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setPageLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Redirect if coming from a protected route
  const from = location.state?.from?.pathname || '/dashboard';

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rememberMe' ? checked : value
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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle reCAPTCHA verification
  const handleCaptchaChange = (value) => {
    setCaptchaVerified(!!value);
  };

  // Effect to set error message from auth context
  useEffect(() => {
    if (authError) {
      setLoginError(authError);
    }
  }, [authError]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (validateForm() && captchaVerified) {
      setIsSubmitting(true);
      try {
        await login({
          email: formData.email,
          password: formData.password
        });
        // Navigate to the dashboard or the page the user was trying to access
        navigate(from, { replace: true });
      } catch (error) {
        console.error('Login error:', error);
        setLoginError(error.message || 'Failed to login. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    } else if (!captchaVerified) {
      setLoginError('Please verify that you are not a robot');
    }
  };

  const handleGoogleLogin = async () => {
    setLoginError('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      navigate(from, { replace: true });
    } catch (error) {
      console.error('Google login error:', error);
      setLoginError(error.message || 'Failed to login with Google. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition type="fade-scale" duration={800} easing="cubic-bezier(0.175, 0.885, 0.32, 1.275)">
      {pageLoading && <PreloadingScreen loading={pageLoading} loadingText="Preparing login..." />}

      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          backgroundColor: 'grey.50',
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(79, 70, 229, 0.03) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(16, 185, 129, 0.03) 0%, transparent 50%)',
          opacity: pageLoading ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
      <Container maxWidth="sm">
        <AnimatedCard
          elevation={3}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
            maxWidth: '100%',
            width: '100%',
            position: 'relative',
            overflow: 'visible',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -2,
              left: -2,
              right: -2,
              bottom: -2,
              background: 'linear-gradient(45deg, rgba(79, 70, 229, 0.15), rgba(16, 185, 129, 0.15))',
              borderRadius: '16px',
              zIndex: -1,
              opacity: 0.5,
              filter: 'blur(8px)',
            }
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h4"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textDecoration: 'none',
                display: 'inline-block',
                mb: 1,
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  width: '40%',
                  height: '3px',
                  bottom: -4,
                  left: '30%',
                  background: 'linear-gradient(90deg, transparent, #4f46e5, transparent)',
                  borderRadius: '3px',
                }
              }}
            >
              TopHire
            </Typography>
            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: 600,
                fontSize: { xs: '1.5rem', sm: '1.8rem' },
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' },
              }}
            >
              Sign in to access your account
            </Typography>
          </Box>

          <ErrorMessage
            message={loginError}
            severity="error"
            autoDismiss={5000}
            onClose={() => setLoginError('')}
          />

          <form onSubmit={handleSubmit}>
            <AnimatedInput
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
              animatedLabel
              animatedBorder
            />

            <AnimatedInput
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
              endAdornment={
                <IconButton
                  onClick={togglePasswordVisibility}
                  edge="end"
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              }
              animatedLabel
              animatedBorder
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mt: 1,
                mb: 3
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    color="primary"
                    size="small"
                  />
                }
                label="Remember me"
              />
              <Link
                to="/forgot-password"
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ fontWeight: 500 }}
                >
                  Forgot password?
                </Typography>
              </Link>
            </Box>

            {/* reCAPTCHA - responsive sizing */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                my: 2,
                '& > div': {
                  transform: { xs: 'scale(0.85)', sm: 'scale(1)' },
                  transformOrigin: 'center',
                  width: { xs: '100%', sm: 'auto' },
                  overflow: 'hidden'
                }
              }}
            >
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // This is a test key
                onChange={handleCaptchaChange}
              />
            </Box>

            <AnimatedButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mb: 3,
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: '0.9rem', sm: '1rem' },
                borderRadius: '10px',
                position: 'relative',
                overflow: 'hidden',
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.25)',
                transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 16px rgba(79, 70, 229, 0.35)',
                },
                '&:active': {
                  transform: 'translateY(1px)',
                }
              }}
              disabled={isSubmitting || authLoading}
              rippleEffect
              shimmerEffect
              glowEffect
            >
              {(isSubmitting || authLoading) ? (
                <LoadingSpinner />
              ) : (
                'Sign In'
              )}
            </AnimatedButton>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={12} sm={4}>
                <AnimatedButton
                  fullWidth
                  variant="outlined"
                  startIcon={<GoogleIcon />}
                  onClick={handleGoogleLogin}
                  sx={{
                    borderRadius: 2,
                    py: { xs: 1, sm: 1.2 },
                    borderWidth: 1.5,
                    borderColor: 'rgba(79, 70, 229, 0.3)',
                    color: '#4285F4',
                    '&:hover': {
                      borderColor: '#4285F4',
                      backgroundColor: 'rgba(66, 133, 244, 0.04)',
                    }
                  }}
                  rippleEffect
                >
                  Google
                </AnimatedButton>
              </Grid>
              <Grid item xs={12} sm={4}>
                <AnimatedButton
                  fullWidth
                  variant="outlined"
                  startIcon={<LinkedInIcon />}
                  onClick={() => setLoginError('LinkedIn login is not implemented yet')}
                  sx={{
                    borderRadius: 2,
                    py: { xs: 1, sm: 1.2 },
                    borderWidth: 1.5,
                    borderColor: 'rgba(79, 70, 229, 0.3)',
                    color: '#0077B5',
                    '&:hover': {
                      borderColor: '#0077B5',
                      backgroundColor: 'rgba(0, 119, 181, 0.04)',
                    }
                  }}
                  rippleEffect
                >
                  LinkedIn
                </AnimatedButton>
              </Grid>
              <Grid item xs={12} sm={4}>
                <AnimatedButton
                  fullWidth
                  variant="outlined"
                  startIcon={<FacebookIcon />}
                  onClick={() => setLoginError('Facebook login is not implemented yet')}
                  sx={{
                    borderRadius: 2,
                    py: { xs: 1, sm: 1.2 },
                    borderWidth: 1.5,
                    borderColor: 'rgba(79, 70, 229, 0.3)',
                    color: '#1877F2',
                    '&:hover': {
                      borderColor: '#1877F2',
                      backgroundColor: 'rgba(24, 119, 242, 0.04)',
                    }
                  }}
                  rippleEffect
                >
                  Facebook
                </AnimatedButton>
              </Grid>
            </Grid>

            <Box
              sx={{
                textAlign: 'center',
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': { transform: 'scale(1)' },
                  '50%': { transform: 'scale(1.03)' },
                  '100%': { transform: 'scale(1)' },
                }
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontSize: { xs: '0.85rem', sm: '0.9rem' } }}
              >
                Don't have an account?{' '}
                <Link
                  to="/signup"
                  style={{ textDecoration: 'none' }}
                >
                  <Typography
                    variant="body2"
                    component="span"
                    color="primary"
                    sx={{
                      fontWeight: 600,
                      position: 'relative',
                      fontSize: { xs: '0.85rem', sm: '0.9rem' },
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '2px',
                        bottom: -2,
                        left: 0,
                        backgroundColor: 'primary.main',
                        transform: 'scaleX(0)',
                        transformOrigin: 'bottom right',
                        transition: 'transform 0.3s ease-out',
                      },
                      '&:hover::after': {
                        transform: 'scaleX(1)',
                        transformOrigin: 'bottom left',
                      }
                    }}
                  >
                    Sign up
                  </Typography>
                </Link>
              </Typography>
            </Box>
          </form>
        </AnimatedCard>
      </Container>
      </Box>
    </PageTransition>
  );
};

export default Login;
