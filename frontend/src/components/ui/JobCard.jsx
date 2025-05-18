import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  IconButton,
  Divider,
  Tooltip
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  AttachMoney as SalaryIcon,
  Work as WorkIcon
} from '@mui/icons-material';

const JobCard = ({
  id,
  title,
  company,
  companyLogo,
  location,
  salary,
  jobType,
  postedDate,
  skills = [],
  isSaved = false,
  isNew = false,
  isFeatured = false,
  isUrgent = false
}) => {
  console.log('Rendering JobCard:', { id, title, company });
  const [saved, setSaved] = useState(isSaved);

  const toggleSaved = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved(!saved);
  };

  // Calculate time ago
  const getTimeAgo = (dateString) => {
    const now = new Date();
    const postedDate = new Date(dateString);
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays < 7) {
      return `${diffDays} days ago`;
    } else if (diffDays < 30) {
      const weeks = Math.floor(diffDays / 7);
      return `${weeks} ${weeks === 1 ? 'week' : 'weeks'} ago`;
    } else {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    }
  };

  return (
    <Card
      component={Link}
      to={`/jobs/${id}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        textDecoration: 'none',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
        },
        position: 'relative',
        overflow: 'visible',
        border: isFeatured ? '1px solid' : 'none',
        borderColor: 'primary.main',
      }}
    >
      {isFeatured && (
        <Chip
          label="Featured"
          color="primary"
          size="small"
          sx={{
            position: 'absolute',
            top: -10,
            right: 16,
            fontWeight: 'bold',
          }}
        />
      )}

      <CardContent sx={{ p: 3, flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Avatar
            src={companyLogo}
            alt={company}
            variant="rounded"
            sx={{
              width: 50,
              height: 50,
              mr: 2,
              border: '1px solid #eee'
            }}
          >
            {company.charAt(0)}
          </Avatar>

          <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
            {isNew && (
              <Chip
                label="New"
                size="small"
                sx={{
                  bgcolor: 'success.light',
                  color: 'success.dark',
                  fontWeight: 'bold',
                  mr: 1
                }}
              />
            )}

            {isUrgent && (
              <Chip
                label="Urgent"
                size="small"
                sx={{
                  bgcolor: 'error.light',
                  color: 'error.dark',
                  fontWeight: 'bold',
                  mr: 1
                }}
              />
            )}

            <Tooltip title={saved ? "Remove from saved jobs" : "Save job"}>
              <IconButton
                size="small"
                onClick={toggleSaved}
                sx={{
                  color: saved ? 'primary.main' : 'text.secondary',
                }}
              >
                {saved ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {company}
        </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {location}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <SalaryIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {salary}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {jobType}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {skills.slice(0, 3).map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              size="small"
              sx={{
                bgcolor: 'primary.50',
                color: 'primary.main',
                fontWeight: 'medium',
              }}
            />
          ))}
          {skills.length > 3 && (
            <Chip
              label={`+${skills.length - 3}`}
              size="small"
              sx={{
                bgcolor: 'grey.100',
                color: 'text.secondary',
              }}
            />
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimeIcon fontSize="small" sx={{ color: 'text.secondary', mr: 0.5 }} />
            <Typography variant="body2" color="text.secondary">
              {getTimeAgo(postedDate)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Apply logic here
            }}
          >
            Apply Now
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default JobCard;
