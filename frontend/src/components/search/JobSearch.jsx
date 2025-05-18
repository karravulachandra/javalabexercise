import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  TextField,
  Button,
  InputAdornment,
  Grid,
  Typography,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Checkbox,
  FormControlLabel,
  FormGroup,
  IconButton,
  Collapse,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  FilterList as FilterListIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Clear as ClearIcon
} from '@mui/icons-material';
import { JobService } from '../../services';

const JobSearch = ({ onSearch, initialFilters = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    ...initialFilters
  });
  
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salary: [0, 200],
    postedWithin: '',
    category: '',
    skills: [],
    isRemote: false,
    ...initialFilters
  });
  
  const [skillInput, setSkillInput] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  
  // Job types
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'];
  
  // Experience levels
  const experienceLevels = ['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Manager', 'Executive'];
  
  // Posted within options
  const postedWithinOptions = [
    { value: '1', label: 'Last 24 hours' },
    { value: '7', label: 'Last 7 days' },
    { value: '14', label: 'Last 14 days' },
    { value: '30', label: 'Last 30 days' },
    { value: 'any', label: 'Any time' }
  ];
  
  // Categories
  const categories = [
    'Software Development',
    'Design',
    'Marketing',
    'Sales',
    'Customer Service',
    'Finance',
    'Human Resources',
    'Engineering',
    'Product Management',
    'Data Science',
    'Operations',
    'Administrative'
  ];

  // Parse URL search params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    
    const keywordParam = params.get('keyword');
    const locationParam = params.get('location');
    const jobTypeParam = params.get('jobType');
    const experienceLevelParam = params.get('experienceLevel');
    const salaryMinParam = params.get('salaryMin');
    const salaryMaxParam = params.get('salaryMax');
    const postedWithinParam = params.get('postedWithin');
    const categoryParam = params.get('category');
    const isRemoteParam = params.get('isRemote');
    const skillsParam = params.get('skills');
    
    const newSearchParams = { ...searchParams };
    const newFilters = { ...filters };
    
    if (keywordParam) newSearchParams.keyword = keywordParam;
    if (locationParam) newSearchParams.location = locationParam;
    if (jobTypeParam) newFilters.jobType = jobTypeParam.split(',');
    if (experienceLevelParam) newFilters.experienceLevel = experienceLevelParam.split(',');
    if (salaryMinParam && salaryMaxParam) newFilters.salary = [parseInt(salaryMinParam), parseInt(salaryMaxParam)];
    if (postedWithinParam) newFilters.postedWithin = postedWithinParam;
    if (categoryParam) newFilters.category = categoryParam;
    if (isRemoteParam) newFilters.isRemote = isRemoteParam === 'true';
    if (skillsParam) newFilters.skills = skillsParam.split(',');
    
    setSearchParams(newSearchParams);
    setFilters(newFilters);
    
    // Update active filters
    updateActiveFilters(newSearchParams, newFilters);
    
    // Perform search with URL params
    if (onSearch && (keywordParam || locationParam || Object.keys(newFilters).some(key => 
      Array.isArray(newFilters[key]) ? newFilters[key].length > 0 : newFilters[key]))) {
      onSearch({
        ...newSearchParams,
        ...newFilters
      });
    }
  }, [location.search]);

  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

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
  };

  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter' && skillInput) {
      e.preventDefault();
      if (!filters.skills.includes(skillInput)) {
        const updatedSkills = [...filters.skills, skillInput];
        setFilters({
          ...filters,
          skills: updatedSkills
        });
      }
      setSkillInput('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setFilters({
      ...filters,
      skills: filters.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const updateActiveFilters = (searchParams, currentFilters) => {
    const active = [];
    
    if (searchParams.keyword) active.push({ type: 'keyword', value: searchParams.keyword });
    if (searchParams.location) active.push({ type: 'location', value: searchParams.location });
    
    if (currentFilters.jobType && currentFilters.jobType.length > 0) {
      currentFilters.jobType.forEach(type => {
        active.push({ type: 'jobType', value: type });
      });
    }
    
    if (currentFilters.experienceLevel && currentFilters.experienceLevel.length > 0) {
      currentFilters.experienceLevel.forEach(level => {
        active.push({ type: 'experienceLevel', value: level });
      });
    }
    
    if (currentFilters.salary && (currentFilters.salary[0] > 0 || currentFilters.salary[1] < 200)) {
      active.push({ type: 'salary', value: `$${currentFilters.salary[0]}K - $${currentFilters.salary[1]}K` });
    }
    
    if (currentFilters.postedWithin && currentFilters.postedWithin !== 'any') {
      const option = postedWithinOptions.find(opt => opt.value === currentFilters.postedWithin);
      if (option) active.push({ type: 'postedWithin', value: option.label });
    }
    
    if (currentFilters.category) {
      active.push({ type: 'category', value: currentFilters.category });
    }
    
    if (currentFilters.isRemote) {
      active.push({ type: 'isRemote', value: 'Remote only' });
    }
    
    if (currentFilters.skills && currentFilters.skills.length > 0) {
      currentFilters.skills.forEach(skill => {
        active.push({ type: 'skill', value: skill });
      });
    }
    
    setActiveFilters(active);
  };

  const removeFilter = (filterType, value) => {
    if (filterType === 'keyword' || filterType === 'location') {
      setSearchParams({
        ...searchParams,
        [filterType]: ''
      });
    } else if (filterType === 'jobType' || filterType === 'experienceLevel') {
      setFilters({
        ...filters,
        [filterType]: filters[filterType].filter(item => item !== value)
      });
    } else if (filterType === 'salary') {
      setFilters({
        ...filters,
        salary: [0, 200]
      });
    } else if (filterType === 'postedWithin') {
      setFilters({
        ...filters,
        postedWithin: ''
      });
    } else if (filterType === 'category') {
      setFilters({
        ...filters,
        category: ''
      });
    } else if (filterType === 'isRemote') {
      setFilters({
        ...filters,
        isRemote: false
      });
    } else if (filterType === 'skill') {
      setFilters({
        ...filters,
        skills: filters.skills.filter(skill => skill !== value)
      });
    }
  };

  const clearAllFilters = () => {
    setSearchParams({
      keyword: '',
      location: ''
    });
    
    setFilters({
      jobType: [],
      experienceLevel: [],
      salary: [0, 200],
      postedWithin: '',
      category: '',
      skills: [],
      isRemote: false
    });
    
    setActiveFilters([]);
  };

  const handleSearch = () => {
    // Update active filters
    updateActiveFilters(searchParams, filters);
    
    // Build search query
    const searchQuery = {
      ...searchParams,
      ...filters
    };
    
    // Update URL with search params
    const urlParams = new URLSearchParams();
    if (searchParams.keyword) urlParams.append('keyword', searchParams.keyword);
    if (searchParams.location) urlParams.append('location', searchParams.location);
    if (filters.jobType.length > 0) urlParams.append('jobType', filters.jobType.join(','));
    if (filters.experienceLevel.length > 0) urlParams.append('experienceLevel', filters.experienceLevel.join(','));
    if (filters.salary[0] > 0 || filters.salary[1] < 200) {
      urlParams.append('salaryMin', filters.salary[0]);
      urlParams.append('salaryMax', filters.salary[1]);
    }
    if (filters.postedWithin) urlParams.append('postedWithin', filters.postedWithin);
    if (filters.category) urlParams.append('category', filters.category);
    if (filters.isRemote) urlParams.append('isRemote', filters.isRemote);
    if (filters.skills.length > 0) urlParams.append('skills', filters.skills.join(','));
    
    navigate({
      pathname: '/jobs',
      search: urlParams.toString()
    });
    
    // Call onSearch callback
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <Box>
      {/* Basic Search */}
      <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="Job title, keywords, or company"
              name="keyword"
              value={searchParams.keyword}
              onChange={handleSearchParamChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={5}>
            <TextField
              fullWidth
              placeholder="City, state, or remote"
              name="location"
              value={searchParams.location}
              onChange={handleSearchParamChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LocationIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          
          <Grid item xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={handleSearch}
              startIcon={<SearchIcon />}
              size="large"
            >
              Search
            </Button>
          </Grid>
          
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Button
                color="primary"
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                startIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
              >
                {showAdvancedFilters ? 'Hide' : 'Show'} Advanced Filters
              </Button>
              
              {activeFilters.length > 0 && (
                <Button
                  color="secondary"
                  onClick={clearAllFilters}
                  startIcon={<ClearIcon />}
                >
                  Clear All Filters
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle2" gutterBottom>
              Active Filters:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {activeFilters.map((filter, index) => (
                <Chip
                  key={`${filter.type}-${filter.value}-${index}`}
                  label={`${filter.value}`}
                  onDelete={() => removeFilter(filter.type, filter.value)}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          </Box>
        )}
        
        {/* Advanced Filters */}
        <Collapse in={showAdvancedFilters}>
          <Divider sx={{ my: 2 }} />
          
          <Grid container spacing={3}>
            {/* Job Type */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Job Type
              </Typography>
              <FormGroup>
                {jobTypes.map((type) => (
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
            </Grid>
            
            {/* Experience Level */}
            <Grid item xs={12} md={4}>
              <Typography variant="subtitle2" gutterBottom>
                Experience Level
              </Typography>
              <FormGroup>
                {experienceLevels.map((level) => (
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
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box>
                {/* Salary Range */}
                <Typography variant="subtitle2" gutterBottom>
                  Salary Range (in thousands)
                </Typography>
                <Box sx={{ px: 2 }}>
                  <Slider
                    value={filters.salary}
                    onChange={(e, newValue) => handleFilterChange('salary', newValue)}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => `$${value}K`}
                    min={0}
                    max={200}
                    step={5}
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="caption">${filters.salary[0]}K</Typography>
                    <Typography variant="caption">${filters.salary[1]}K</Typography>
                  </Box>
                </Box>
                
                {/* Posted Within */}
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Posted Within
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={filters.postedWithin}
                    onChange={(e) => handleFilterChange('postedWithin', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">Any time</MenuItem>
                    {postedWithinOptions.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {/* Category */}
                <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                  Category
                </Typography>
                <FormControl fullWidth size="small">
                  <Select
                    value={filters.category}
                    onChange={(e) => handleFilterChange('category', e.target.value)}
                    displayEmpty
                  >
                    <MenuItem value="">All Categories</MenuItem>
                    {categories.map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                {/* Remote Only */}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={filters.isRemote}
                      onChange={(e) => handleFilterChange('isRemote', e.target.checked)}
                    />
                  }
                  label="Remote Only"
                  sx={{ mt: 2 }}
                />
              </Box>
            </Grid>
            
            {/* Skills */}
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Skills
              </Typography>
              <TextField
                fullWidth
                placeholder="Add skills and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillInputKeyDown}
                size="small"
                sx={{ mb: 2 }}
              />
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {filters.skills.map((skill) => (
                  <Chip
                    key={skill}
                    label={skill}
                    onDelete={() => removeSkill(skill)}
                    size="small"
                  />
                ))}
              </Box>
            </Grid>
            
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSearch}
                  startIcon={<SearchIcon />}
                >
                  Apply Filters
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Collapse>
      </Paper>
    </Box>
  );
};

export default JobSearch;
