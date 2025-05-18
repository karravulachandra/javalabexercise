import { useState, useRef, useEffect } from 'react';
import { Card, Box } from '@mui/material';

const AnimatedCard = ({ children, elevation = 1, hoverElevation = 8, ...props }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  
  // Handle mouse movement for 3D effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation (limited to small angles)
    const rotateX = mouseY / (rect.height / 2) * -5; // Max 5 degrees
    const rotateY = mouseX / (rect.width / 2) * 5; // Max 5 degrees
    
    // Calculate highlight position
    const posX = (e.clientX - rect.left) / rect.width * 100;
    const posY = (e.clientY - rect.top) / rect.height * 100;
    
    setRotation({ x: rotateX, y: rotateY });
    setPosition({ x: posX, y: posY });
  };
  
  // Reset card on mouse leave
  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };
  
  // Clean up event listeners
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    
    if (isHovered) {
      card.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      if (card) {
        card.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isHovered]);
  
  return (
    <Card
      ref={cardRef}
      elevation={isHovered ? hoverElevation : elevation}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      sx={{
        position: 'relative',
        transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)`
          : 'perspective(1000px) rotateX(0) rotateY(0) scale(1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: isHovered 
            ? `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`
            : 'none',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 1,
          pointerEvents: 'none',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: -1,
          left: -1,
          right: -1,
          bottom: -1,
          borderRadius: 'inherit',
          background: isHovered 
            ? 'linear-gradient(135deg, rgba(79, 70, 229, 0.5) 0%, rgba(99, 102, 241, 0) 50%, rgba(16, 185, 129, 0.5) 100%)'
            : 'none',
          opacity: isHovered ? 0.5 : 0,
          transition: 'opacity 0.3s ease',
          zIndex: 0,
          pointerEvents: 'none',
        },
        ...props.sx
      }}
      {...props}
    >
      <Box sx={{ position: 'relative', zIndex: 2 }}>
        {children}
      </Box>
    </Card>
  );
};

export default AnimatedCard;
