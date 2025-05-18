import { useState, useRef } from 'react';
import { Button, Box } from '@mui/material';
import { keyframes } from '@mui/system';

const ripple = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.5;
  }
  100% {
    transform: scale(2);
    opacity: 0;
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

const AnimatedButton = ({
  children,
  variant = 'contained',
  color = 'primary',
  rippleEffect = true,
  shimmerEffect = false,
  glowEffect = false,
  ...props
}) => {
  const [rippleStyle, setRippleStyle] = useState({ top: 0, left: 0, opacity: 0 });
  const [isRippling, setIsRippling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  // Handle ripple effect
  const handleRipple = (e) => {
    if (!rippleEffect || !buttonRef.current) return;
    
    const button = buttonRef.current;
    const rect = button.getBoundingClientRect();
    
    // Calculate ripple position
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    
    setRippleStyle({ top, left, opacity: 1 });
    setIsRippling(true);
    
    // Reset ripple after animation
    setTimeout(() => {
      setIsRippling(false);
    }, 600);
  };

  // Base styles for all variants
  const baseStyles = {
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    transform: isHovered ? 'translateY(-3px)' : 'translateY(0)',
    '&:active': {
      transform: 'translateY(0)',
    },
  };

  // Variant-specific styles
  const variantStyles = {
    contained: {
      background: color === 'primary' 
        ? 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)'
        : color === 'secondary'
          ? 'linear-gradient(45deg, #10b981 30%, #34d399 90%)'
          : undefined,
      boxShadow: isHovered 
        ? '0 8px 16px rgba(79, 70, 229, 0.3)'
        : '0 4px 6px rgba(79, 70, 229, 0.1)',
      ...(shimmerEffect && {
        backgroundSize: '200% 100%',
        backgroundImage: color === 'primary'
          ? 'linear-gradient(90deg, #4f46e5 0%, #6366f1 25%, #818cf8 50%, #6366f1 75%, #4f46e5 100%)'
          : 'linear-gradient(90deg, #10b981 0%, #34d399 25%, #6ee7b7 50%, #34d399 75%, #10b981 100%)',
        animation: isHovered ? `${shimmer} 2s infinite linear` : 'none',
      }),
      ...(glowEffect && isHovered && {
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: color === 'primary'
            ? 'linear-gradient(45deg, #4f46e5 30%, #6366f1 90%)'
            : 'linear-gradient(45deg, #10b981 30%, #34d399 90%)',
          borderRadius: 'inherit',
          filter: 'blur(8px)',
          opacity: 0.7,
          zIndex: -1,
        },
      }),
    },
    outlined: {
      borderWidth: 2,
      borderColor: color === 'primary' ? '#4f46e5' : '#10b981',
      '&:hover': {
        borderWidth: 2,
        borderColor: color === 'primary' ? '#6366f1' : '#34d399',
        background: color === 'primary'
          ? 'rgba(79, 70, 229, 0.05)'
          : 'rgba(16, 185, 129, 0.05)',
      },
      ...(glowEffect && isHovered && {
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          borderRadius: 'inherit',
          border: color === 'primary'
            ? '2px solid #4f46e5'
            : '2px solid #10b981',
          filter: 'blur(4px)',
          opacity: 0.7,
          zIndex: -1,
        },
      }),
    },
    text: {
      '&:hover': {
        background: color === 'primary'
          ? 'rgba(79, 70, 229, 0.05)'
          : 'rgba(16, 185, 129, 0.05)',
      },
    },
  };

  return (
    <Button
      ref={buttonRef}
      variant={variant}
      color={color}
      onClick={handleRipple}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        ...baseStyles,
        ...(variantStyles[variant] || {}),
        ...props.sx,
      }}
      {...props}
    >
      {children}
      
      {/* Ripple effect */}
      {isRippling && rippleEffect && (
        <Box
          sx={{
            position: 'absolute',
            borderRadius: '50%',
            width: 100,
            height: 100,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            top: rippleStyle.top - 50,
            left: rippleStyle.left - 50,
            transform: 'scale(0)',
            animation: `${ripple} 0.6s linear`,
            pointerEvents: 'none',
          }}
        />
      )}
    </Button>
  );
};

export default AnimatedButton;
