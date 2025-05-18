import { useState } from 'react';
import { Box, Container, Grid, Typography, Link, IconButton, Divider, Paper, Button, useTheme, useMediaQuery } from '@mui/material';
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  Email as EmailIcon,
  ArrowUpward as ArrowUpwardIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { keyframes } from '@mui/system';

// Define animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isExtraSmallScreen = useMediaQuery('(max-width:280px)'); // For smartwatches
  const [hovered, setHovered] = useState(null);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box
      component="footer"
      sx={{
        py: { xs: 4, sm: 6 },
        px: { xs: 1, sm: 2 },
        mt: 'auto',
        backgroundColor: 'white',
        borderTop: '1px solid #eee',
        background: 'linear-gradient(180deg, #f9fafb 0%, #ffffff 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          background: 'linear-gradient(90deg, #4f46e5, #6366f1, #10b981, #4f46e5)',
          backgroundSize: '200% 100%',
          animation: `${shimmer} 3s infinite linear`
        }
      }}
    >
      {/* Back to top button */}
      <Box
        sx={{
          position: 'absolute',
          right: { xs: 16, sm: 32 },
          bottom: { xs: 16, sm: 32 },
          zIndex: 10
        }}
      >
        <IconButton
          onClick={scrollToTop}
          sx={{
            backgroundColor: 'primary.main',
            color: 'white',
            boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'translateY(-4px)',
              boxShadow: '0 6px 20px rgba(79, 70, 229, 0.6)',
            },
            width: { xs: 40, sm: 48 },
            height: { xs: 40, sm: 48 },
          }}
        >
          <ArrowUpwardIcon />
        </IconButton>
      </Box>

      {/* Newsletter subscription */}
      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: { xs: 2, sm: 4 },
            borderRadius: 4,
            background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            mb: 6,
            mt: -2,
            position: 'relative',
            overflow: 'hidden',
            display: isExtraSmallScreen ? 'none' : 'block', // Hide on very small screens
            '&::after': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.1) 0%, transparent 70%)',
              zIndex: 0
            }
          }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={7} sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Stay Updated with Job Opportunities
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ mb: { xs: 2, md: 0 } }}>
                Subscribe to our newsletter and receive the latest job listings and career advice.
              </Typography>
            </Grid>
            <Grid item xs={12} md={5} sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <input
                    type="email"
                    placeholder="Your email address"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      borderRadius: '10px',
                      border: '1px solid #e5e7eb',
                      fontSize: '16px',
                      outline: 'none',
                      transition: 'all 0.2s ease',
                    }}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{
                    px: 3,
                    py: 1.5,
                    whiteSpace: 'nowrap',
                    background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                    }
                  }}
                >
                  Subscribe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={4}>
          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              animation: `${fadeInUp} 0.6s ease-out`,
              '& > *': {
                transition: 'all 0.3s ease',
              }
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block',
                fontSize: { xs: '1.1rem', sm: '1.25rem' },
                mb: 2
              }}
            >
              TopHire
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              paragraph
              sx={{
                fontSize: isExtraSmallScreen ? '0.75rem' : 'inherit',
                mb: 2
              }}
            >
              Connecting talented professionals with their dream careers. Find your perfect job match with our advanced AI-powered job matching platform.
            </Typography>

            {/* Contact information */}
            <Box sx={{ mb: 2, display: isExtraSmallScreen ? 'none' : 'block' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <LocationIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  123 Job Street, Career City
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon fontSize="small" color="primary" sx={{ mr: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  contact@tophire.com
                </Typography>
              </Box>
            </Box>

            <Box sx={{ mt: 2 }}>
              {['facebook', 'twitter', 'linkedin', 'instagram'].map((social, index) => {
                const Icon =
                  social === 'facebook' ? FacebookIcon :
                  social === 'twitter' ? TwitterIcon :
                  social === 'linkedin' ? LinkedInIcon :
                  InstagramIcon;

                return (
                  <IconButton
                    key={social}
                    color="primary"
                    aria-label={social}
                    component="a"
                    href="#"
                    size="small"
                    onMouseEnter={() => setHovered(social)}
                    onMouseLeave={() => setHovered(null)}
                    sx={{
                      mr: 1,
                      transition: 'all 0.3s ease',
                      transform: hovered === social ? 'translateY(-4px)' : 'none',
                      animation: hovered === social ? `${pulse} 1s infinite ease-in-out` : 'none',
                      backgroundColor: hovered === social ? 'rgba(79, 70, 229, 0.1)' : 'transparent',
                    }}
                  >
                    <Icon />
                  </IconButton>
                );
              })}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              animation: `${fadeInUp} 0.6s ease-out 0.1s both`,
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                position: 'relative',
                display: 'inline-block',
                mb: 2,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40%',
                  height: 2,
                  backgroundColor: 'primary.main',
                  borderRadius: 1
                }
              }}
            >
              For Job Seekers
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {['Browse Jobs', 'Create Resume', 'Job Alerts', 'Career Advice', 'Salary Calculator'].map((item, index) => (
                <Box
                  key={item}
                  component="li"
                  sx={{
                    mb: 1.5,
                    transform: 'translateX(-8px)',
                    opacity: 0,
                    animation: `${fadeInUp} 0.4s ease-out ${0.2 + index * 0.1}s forwards`,
                  }}
                >
                  <Link
                    href="#"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      fontSize: isExtraSmallScreen ? '0.75rem' : 'inherit',
                      '&:hover': {
                        color: 'primary.main',
                        transform: 'translateX(4px)',
                      },
                      '&::before': {
                        content: '"→"',
                        marginRight: '8px',
                        opacity: 0,
                        transform: 'translateX(-8px)',
                        transition: 'all 0.2s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                        transform: 'translateX(0)',
                        color: 'primary.main',
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              animation: `${fadeInUp} 0.6s ease-out 0.2s both`,
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                position: 'relative',
                display: 'inline-block',
                mb: 2,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40%',
                  height: 2,
                  backgroundColor: 'secondary.main',
                  borderRadius: 1
                }
              }}
            >
              For Employers
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {['Post a Job', 'Search Resumes', 'Recruiting Solutions', 'Pricing Plans', 'Recruitment Software'].map((item, index) => (
                <Box
                  key={item}
                  component="li"
                  sx={{
                    mb: 1.5,
                    transform: 'translateX(-8px)',
                    opacity: 0,
                    animation: `${fadeInUp} 0.4s ease-out ${0.3 + index * 0.1}s forwards`,
                  }}
                >
                  <Link
                    href="#"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      fontSize: isExtraSmallScreen ? '0.75rem' : 'inherit',
                      '&:hover': {
                        color: 'secondary.main',
                        transform: 'translateX(4px)',
                      },
                      '&::before': {
                        content: '"→"',
                        marginRight: '8px',
                        opacity: 0,
                        transform: 'translateX(-8px)',
                        transition: 'all 0.2s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                        transform: 'translateX(0)',
                        color: 'secondary.main',
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            sm={6}
            md={3}
            sx={{
              animation: `${fadeInUp} 0.6s ease-out 0.3s both`,
            }}
          >
            <Typography
              variant="subtitle1"
              color="text.primary"
              fontWeight="bold"
              gutterBottom
              sx={{
                fontSize: { xs: '1rem', sm: '1.1rem' },
                position: 'relative',
                display: 'inline-block',
                mb: 2,
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: '40%',
                  height: 2,
                  background: 'linear-gradient(90deg, #4f46e5, #10b981)',
                  borderRadius: 1
                }
              }}
            >
              Resources
            </Typography>
            <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
              {['Help Center', 'About Us', 'Contact Us', 'Privacy Policy', 'Terms of Service'].map((item, index) => (
                <Box
                  key={item}
                  component="li"
                  sx={{
                    mb: 1.5,
                    transform: 'translateX(-8px)',
                    opacity: 0,
                    animation: `${fadeInUp} 0.4s ease-out ${0.4 + index * 0.1}s forwards`,
                  }}
                >
                  <Link
                    href="#"
                    underline="hover"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      transition: 'all 0.2s ease',
                      fontSize: isExtraSmallScreen ? '0.75rem' : 'inherit',
                      '&:hover': {
                        color: 'info.main',
                        transform: 'translateX(4px)',
                      },
                      '&::before': {
                        content: '"→"',
                        marginRight: '8px',
                        opacity: 0,
                        transform: 'translateX(-8px)',
                        transition: 'all 0.2s ease',
                      },
                      '&:hover::before': {
                        opacity: 1,
                        transform: 'translateX(0)',
                        color: 'info.main',
                      }
                    }}
                  >
                    {item}
                  </Link>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>

        <Divider
          sx={{
            my: 4,
            '&::before, &::after': {
              borderColor: 'rgba(0, 0, 0, 0.06)',
            }
          }}
        />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            animation: `${fadeInUp} 0.6s ease-out 0.5s both`,
          }}
        >
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              fontSize: isExtraSmallScreen ? '0.7rem' : 'inherit',
              mb: { xs: 2, sm: 0 }
            }}
          >
            © {currentYear} TopHire. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: { xs: 1, sm: 2 } }}>
            {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((item, index) => (
              <Link
                key={item}
                href="#"
                underline="hover"
                color="text.secondary"
                sx={{
                  fontSize: isExtraSmallScreen ? '0.7rem' : 'inherit',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: 'primary.main',
                  },
                  opacity: 0,
                  animation: `${fadeInUp} 0.4s ease-out ${0.6 + index * 0.1}s forwards`,
                }}
              >
                {item}
              </Link>
            ))}
          </Box>
        </Box>

        {/* Mobile app badges - hidden on very small screens */}
        {!isExtraSmallScreen && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              gap: 2,
              flexWrap: 'wrap',
              animation: `${fadeInUp} 0.6s ease-out 0.7s both`,
            }}
          >
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
              alt="Download on App Store"
              sx={{
                height: 40,
                transition: 'all 0.3s ease',
                filter: 'grayscale(0.5)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  filter: 'grayscale(0)',
                }
              }}
            />
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
              alt="Get it on Google Play"
              sx={{
                height: 40,
                transition: 'all 0.3s ease',
                filter: 'grayscale(0.5)',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  filter: 'grayscale(0)',
                }
              }}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Footer;
