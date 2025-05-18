import { Box, CircularProgress, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const pulse = keyframes`
  0% {
    transform: scale(0.95);
    opacity: 0.7;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(0.95);
    opacity: 0.7;
  }
`;

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const LoadingSpinner = ({ text = 'Loading...', fullScreen = false }) => {
  const containerStyles = fullScreen
    ? {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(5px)',
      }
    : {};

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: fullScreen ? '100vh' : '100%',
        width: '100%',
        ...containerStyles,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        <CircularProgress
          size={80}
          thickness={2}
          sx={{
            color: 'primary.main',
            position: 'absolute',
            top: 0,
            left: 0,
            animation: `${rotate} 1.5s linear infinite`,
          }}
        />
        <CircularProgress
          size={60}
          thickness={2}
          sx={{
            color: 'secondary.main',
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -30,
            marginLeft: -30,
            animation: `${rotate} 2s linear infinite reverse`,
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 40,
            height: 40,
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
            boxShadow: '0 0 15px rgba(79, 70, 229, 0.5)',
          }}
        />
      </Box>
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          fontWeight: 500,
          background: 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          animation: `${pulse} 2s infinite ease-in-out`,
        }}
      >
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingSpinner;
