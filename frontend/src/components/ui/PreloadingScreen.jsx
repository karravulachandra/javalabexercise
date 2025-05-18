import { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { keyframes } from '@mui/system';

// Define animations
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const fadeOut = keyframes`
  from { opacity: 1; }
  to { opacity: 0; }
`;

const slideUp = keyframes`
  from { transform: translateY(20px); }
  to { transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(0.98); opacity: 0.8; }
  50% { transform: scale(1); opacity: 1; }
  100% { transform: scale(0.98); opacity: 0.8; }
`;

const PreloadingScreen = ({ 
  loading = true, 
  minDisplayTime = 1500,
  fadeOutTime = 500,
  logo,
  logoText = 'TopHire',
  loadingText = 'Loading...',
  progressValue = null,
  onFinished = () => {}
}) => {
  const [display, setDisplay] = useState(true);
  const [opacity, setOpacity] = useState(1);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    if (!loading) {
      const elapsedTime = Date.now() - startTime;
      const remainingTime = Math.max(0, minDisplayTime - elapsedTime);
      
      // Ensure minimum display time before starting fade out
      setTimeout(() => {
        setOpacity(0);
        
        // Remove from DOM after fade out animation completes
        setTimeout(() => {
          setDisplay(false);
          onFinished();
        }, fadeOutTime);
      }, remainingTime);
    }
  }, [loading, minDisplayTime, fadeOutTime, startTime, onFinished]);

  if (!display) return null;

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f9fafb 0%, #ffffff 100%)',
        zIndex: 9999,
        opacity,
        transition: `opacity ${fadeOutTime}ms ease-out`,
        animation: `${fadeIn} 300ms ease-out`,
      }}
    >
      {/* Logo */}
      <Box
        sx={{
          width: 100,
          height: 100,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 3,
          animation: `${pulse} 2s infinite ease-in-out, ${slideUp} 500ms ease-out`,
        }}
      >
        {logo ? (
          logo
        ) : (
          <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#4f46e5" />
            <path d="M2 17L12 22L22 17" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 12L12 17L22 12" stroke="#4f46e5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </Box>

      {/* Logo Text */}
      <Typography
        variant="h4"
        component="h1"
        sx={{
          fontWeight: 700,
          mb: 3,
          background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${pulse} 2s infinite ease-in-out, ${slideUp} 600ms ease-out`,
          fontFamily: 'Poppins, sans-serif',
        }}
      >
        {logoText}
      </Typography>

      {/* Progress Indicator */}
      <Box
        sx={{
          position: 'relative',
          width: 60,
          height: 60,
          animation: `${slideUp} 700ms ease-out`,
        }}
      >
        <CircularProgress
          variant={progressValue !== null ? 'determinate' : 'indeterminate'}
          value={progressValue !== null ? progressValue : undefined}
          size={60}
          thickness={4}
          sx={{
            color: 'primary.main',
          }}
        />
        
        {progressValue !== null && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              sx={{ fontWeight: 'bold' }}
            >
              {`${Math.round(progressValue)}%`}
            </Typography>
          </Box>
        )}
      </Box>

      {/* Loading Text */}
      <Typography
        variant="body1"
        sx={{
          mt: 3,
          fontWeight: 500,
          color: 'text.secondary',
          animation: `${pulse} 2s infinite ease-in-out, ${slideUp} 800ms ease-out`,
        }}
      >
        {loadingText}
      </Typography>
    </Box>
  );
};

export default PreloadingScreen;
