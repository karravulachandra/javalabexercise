import { useState, useEffect, useRef } from 'react';
import { Box } from '@mui/material';
import { keyframes } from '@mui/system';
import LoadingSpinner from './LoadingSpinner';

// Basic animations
const fadeIn = keyframes`
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.95) translateY(10px);
  }
  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const slideInRight = keyframes`
  0% {
    transform: translateX(100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInLeft = keyframes`
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInUp = keyframes`
  0% {
    transform: translateY(100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideInDown = keyframes`
  0% {
    transform: translateY(-100%);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;

const zoomIn = keyframes`
  0% {
    transform: scale(0.5);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
`;

const blurIn = keyframes`
  0% {
    filter: blur(20px);
    opacity: 0;
  }
  100% {
    filter: blur(0);
    opacity: 1;
  }
`;

const PageTransition = ({
  children,
  type = 'fade',
  duration = 500,
  delay = 0,
  staggerDelay = 100,
  easing = 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  loading = false,
  loadingText = 'Loading...',
  onAnimationComplete = () => {},
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(loading);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);
  const animationTimeoutRef = useRef(null);

  useEffect(() => {
    // Set loading state
    setIsLoading(loading);

    // Show content after delay
    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);

      // Set animation complete after duration
      animationTimeoutRef.current = setTimeout(() => {
        setIsAnimationComplete(true);
        onAnimationComplete();
      }, duration + (Array.isArray(children) ? children.length * staggerDelay : 0));
    }, delay);

    return () => {
      clearTimeout(visibilityTimer);
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, [delay, duration, loading, children, staggerDelay, onAnimationComplete]);

  // Get animation keyframes based on type
  const getAnimationKeyframes = () => {
    switch (type) {
      case 'fade':
        return fadeIn;
      case 'fade-scale':
        return fadeInScale;
      case 'slide-right':
        return slideInRight;
      case 'slide-left':
        return slideInLeft;
      case 'slide-up':
        return slideInUp;
      case 'slide-down':
        return slideInDown;
      case 'zoom':
        return zoomIn;
      case 'blur':
        return blurIn;
      default:
        return fadeIn;
    }
  };

  // Animation styles based on type
  const getAnimationStyle = (index = 0) => {
    const keyframes = getAnimationKeyframes();
    const staggeredDelay = delay + (index * staggerDelay);

    return {
      animation: `${keyframes} ${duration}ms ${easing} forwards`,
      animationDelay: `${staggeredDelay}ms`,
      willChange: 'opacity, transform',
    };
  };

  // Staggered children animation
  const renderChildren = () => {
    if (!Array.isArray(children)) {
      return (
        <Box
          sx={{
            opacity: 0,
            ...getAnimationStyle(),
            height: '100%',
          }}
        >
          {children}
        </Box>
      );
    }

    return children.map((child, index) => (
      <Box
        key={index}
        sx={{
          opacity: 0,
          ...getAnimationStyle(index),
        }}
      >
        {child}
      </Box>
    ));
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        ...props.sx,
      }}
    >
      {isLoading ? (
        <LoadingSpinner text={loadingText} />
      ) : (
        <Box
          sx={{
            opacity: isVisible ? 1 : 0,
            transition: `opacity ${duration}ms ${easing}`,
            height: '100%',
            position: 'relative',
          }}
        >
          {renderChildren()}
        </Box>
      )}
    </Box>
  );
};

export default PageTransition;
