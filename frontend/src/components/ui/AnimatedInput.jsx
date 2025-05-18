import { useState } from 'react';
import { TextField, Box, InputAdornment, Typography } from '@mui/material';
import { keyframes } from '@mui/system';

const focusAnimation = keyframes`
  0% {
    width: 0;
    opacity: 0;
  }
  100% {
    width: 100%;
    opacity: 1;
  }
`;

const floatLabel = keyframes`
  0% {
    transform: translateY(0);
    font-size: 1rem;
  }
  100% {
    transform: translateY(-1.5rem);
    font-size: 0.75rem;
  }
`;

const AnimatedInput = ({
  label,
  startAdornment,
  endAdornment,
  variant = 'outlined',
  color = 'primary',
  animatedBorder = true,
  animatedLabel = true,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(!!props.value || !!props.defaultValue);
  
  const handleFocus = (e) => {
    setIsFocused(true);
    if (props.onFocus) props.onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (props.onBlur) props.onBlur(e);
  };
  
  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    if (props.onChange) props.onChange(e);
  };
  
  // Base styles
  const baseStyles = {
    position: 'relative',
    '& .MuiOutlinedInput-root': {
      transition: 'all 0.3s ease',
      borderRadius: 2,
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: color === 'primary' ? '#4f46e5' : '#10b981',
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderWidth: animatedBorder ? 2 : 1,
        borderColor: color === 'primary' ? '#4f46e5' : '#10b981',
      },
    },
  };
  
  // Animated border styles
  const animatedBorderStyles = animatedBorder ? {
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      left: '50%',
      width: isFocused ? '100%' : 0,
      height: 2,
      backgroundColor: color === 'primary' ? '#4f46e5' : '#10b981',
      transition: 'all 0.3s ease',
      transform: 'translateX(-50%)',
      opacity: isFocused ? 1 : 0,
      zIndex: 1,
      animation: isFocused ? `${focusAnimation} 0.3s ease forwards` : 'none',
    },
  } : {};
  
  // Animated label
  const renderLabel = () => {
    if (!label || !animatedLabel) return null;
    
    return (
      <Typography
        variant="body2"
        sx={{
          position: 'absolute',
          top: isFocused || hasValue ? '-1.5rem' : '50%',
          left: startAdornment ? '2.5rem' : '0.875rem',
          transform: isFocused || hasValue ? 'translateY(0)' : 'translateY(-50%)',
          fontSize: isFocused || hasValue ? '0.75rem' : '1rem',
          color: isFocused 
            ? color === 'primary' ? '#4f46e5' : '#10b981'
            : 'text.secondary',
          transition: 'all 0.2s ease',
          pointerEvents: 'none',
          zIndex: 1,
          animation: isFocused && !hasValue ? `${floatLabel} 0.2s ease forwards` : 'none',
          fontWeight: isFocused ? 500 : 400,
        }}
      >
        {label}
      </Typography>
    );
  };
  
  return (
    <Box sx={{ position: 'relative', mt: animatedLabel ? 3 : 0 }}>
      {renderLabel()}
      <TextField
        variant={variant}
        color={color}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        InputProps={{
          startAdornment: startAdornment && (
            <InputAdornment position="start">
              {startAdornment}
            </InputAdornment>
          ),
          endAdornment: endAdornment && (
            <InputAdornment position="end">
              {endAdornment}
            </InputAdornment>
          ),
        }}
        sx={{
          ...baseStyles,
          ...animatedBorderStyles,
          ...props.sx,
        }}
        {...props}
        label={animatedLabel ? undefined : label}
      />
    </Box>
  );
};

export default AnimatedInput;
