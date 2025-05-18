import { useState } from 'react';
import {
  Box, Paper, Typography, Divider, Checkbox, FormGroup, FormControlLabel,
  Slider, Select, MenuItem, TextField, Chip, Button
} from '@mui/material';
import { TuneOutlined as TuneIcon } from '@mui/icons-material';

const JobFilter = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salary: [0, 200],
    postedWithin: '',
    skills: []
  });
  
  const [skillInput, setSkillInput] = useState('');

  const handleFilterChange = (filterType, value) => {
    let updatedFilters;
    
    if (filterType === 'jobType' || filterType === 'experienceLevel') {
      // Handle checkbox arrays
      const updatedValues = filters[filterType].includes(value)
        ? filters[filterType].filter(item => item !== value)
        : [...filters[filterType], value];
      
      updatedFilters = {
        ...filters,
        [filterType]: updatedValues
      };
    } else {
      // Handle other filter types
      updatedFilters = {
        ...filters,
        [filterType]: value
      };
    }
    
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const addSkill = (skill) => {
    if (skill && !filters.skills.includes(skill)) {
      const updatedFilters = {
        ...filters,
        skills: [...filters.skills, skill]
      };
      setFilters(updatedFilters);
      if (onFilterChange) onFilterChange(updatedFilters);
    }
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    const updatedFilters = {
      ...filters,
      skills: filters.skills.filter(s => s !== skill)
    };
    setFilters(updatedFilters);
    if (onFilterChange) onFilterChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const resetFilters = {
      jobType: [],
      experienceLevel: [],
      salary: [0, 200],
      postedWithin: '',
      skills: []
    };
    setFilters(resetFilters);
    if (onFilterChange) onFilterChange(resetFilters);
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput.trim()) {
      addSkill(skillInput.trim());
      e.preventDefault();
    }
  };

  return (
    <Paper sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" component="h2" sx={{ fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
          <TuneIcon sx={{ mr: 1 }} />
          Filters
        </Typography>
        <Button 
          size="small" 
          onClick={clearAllFilters}
          sx={{ textTransform: 'none' }}
        >
          Clear All
        </Button>
      </Box>
      
      <Divider sx={{ mb: 3 }} />
      
      {/* Job Type */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Job Type
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        {['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'].map((type) => (
          <FormControlLabel
            key={type}
            control={
              <Checkbox 
                checked={filters.jobType.includes(type)}
                onChange={() => handleFilterChange('jobType', type)}
                size="small"
              />
            }
            label={type}
          />
        ))}
      </FormGroup>
      
      {/* Experience Level */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Experience Level
      </Typography>
      <FormGroup sx={{ mb: 3 }}>
        {['Entry Level', 'Mid Level', 'Senior Level', 'Director', 'Executive'].map((level) => (
          <FormControlLabel
            key={level}
            control={
              <Checkbox 
                checked={filters.experienceLevel.includes(level)}
                onChange={() => handleFilterChange('experienceLevel', level)}
                size="small"
              />
            }
            label={level}
          />
        ))}
      </FormGroup>
      
      {/* Salary Range */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Salary Range (K)
      </Typography>
      <Box sx={{ px: 1, mb: 3 }}>
        <Slider
          value={filters.salary}
          onChange={(e, newValue) => handleFilterChange('salary', newValue)}
          valueLabelDisplay="auto"
          min={0}
          max={200}
          step={10}
          valueLabelFormat={(value) => `$${value}K`}
        />
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="body2" color="text.secondary">
            ${filters.salary[0]}K
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${filters.salary[1]}K
          </Typography>
        </Box>
      </Box>
      
      {/* Posted Within */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Posted Within
      </Typography>
      <Select
        value={filters.postedWithin}
        onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
        displayEmpty
        fullWidth
        size="small"
        sx={{ mb: 3 }}
      >
        <MenuItem value="">Any time</MenuItem>
        <MenuItem value="24h">Last 24 hours</MenuItem>
        <MenuItem value="7d">Last 7 days</MenuItem>
        <MenuItem value="14d">Last 14 days</MenuItem>
        <MenuItem value="30d">Last 30 days</MenuItem>
      </Select>
      
      {/* Skills */}
      <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mb: 1 }}>
        Skills
      </Typography>
      <TextField
        fullWidth
        size="small"
        placeholder="Add a skill and press Enter"
        value={skillInput}
        onChange={(e) => setSkillInput(e.target.value)}
        onKeyDown={handleSkillInputKeyDown}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
        {filters.skills.map((skill) => (
          <Chip
            key={skill}
            label={skill}
            onDelete={() => removeSkill(skill)}
            size="small"
          />
        ))}
      </Box>
      
      <Button 
        variant="contained" 
        color="primary" 
        fullWidth
        onClick={() => onFilterChange && onFilterChange(filters)}
      >
        Apply Filters
      </Button>
    </Paper>
  );
};

export default JobFilter;
