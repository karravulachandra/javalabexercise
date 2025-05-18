import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Divider,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Slider,
  IconButton,
  Collapse,
  Grid,
  InputAdornment,
  Autocomplete,
  Tooltip,
  Badge
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Sort as SortIcon,
  Tune as TuneIcon,
  Star as StarIcon,
  School as SchoolIcon,
  AttachMoney as SalaryIcon,
  CalendarToday as CalendarIcon
} from '@mui/icons-material';
import { SearchService } from '../../services';

const AdvancedJobFilter = ({ onSearch, initialFilters = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Basic search params
  const [searchParams, setSearchParams] = useState({
    keyword: '',
    location: '',
    ...initialFilters
  });

  // Advanced filters
  const [filters, setFilters] = useState({
    jobType: [],
    experienceLevel: [],
    salary: [0, 200],
    postedWithin: '',
    category: '',
    skills: [],
    educationLevel: '',
    isRemote: false,
    company: '',
    featuredOnly: false,
    newOnly: false,
    sort: 'newest',
    ...initialFilters
  });

  // Active filters count for badge
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Skill input for adding skills
  const [skillInput, setSkillInput] = useState('');

  // Job types
  const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship', 'Remote'];

  // Experience levels
  const experienceLevels = ['Entry-level', 'Junior', 'Mid-level', 'Senior', 'Lead', 'Manager', 'Executive'];

  // Education levels
  const educationLevels = ['High School', 'Associate Degree', "Bachelor's Degree", "Master's Degree", 'PhD', 'No Requirement'];

  // Posted within options
  const postedWithinOptions = [
    { value: '1', label: 'Last 24 hours' },
    { value: '7', label: 'Last 7 days' },
    { value: '14', label: 'Last 14 days' },
    { value: '30', label: 'Last 30 days' },
    { value: 'any', label: 'Any time' }
  ];

  // Sort options
  const sortOptions = [
    { value: 'newest', label: 'Newest first' },
    { value: 'oldest', label: 'Oldest first' },
    { value: 'salary_high', label: 'Highest salary' },
    { value: 'salary_low', label: 'Lowest salary' },
    { value: 'company_az', label: 'Company (A-Z)' },
    { value: 'company_za', label: 'Company (Z-A)' },
    { value: 'title_az', label: 'Job title (A-Z)' },
    { value: 'title_za', label: 'Job title (Z-A)' },
    { value: 'relevance', label: 'Relevance' }
  ];

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await SearchService.getJobCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Parse URL search params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Basic search params
    const keywordParam = params.get('keyword');
    const locationParam = params.get('location');

    // Advanced filters
    const jobTypeParam = params.get('jobType');
    const experienceLevelParam = params.get('experienceLevel');
    const salaryMinParam = params.get('salaryMin');
    const salaryMaxParam = params.get('salaryMax');
    const postedWithinParam = params.get('postedWithin');
    const categoryParam = params.get('category');
    const skillsParam = params.get('skills');
    const educationLevelParam = params.get('educationLevel');
    const isRemoteParam = params.get('isRemote');
    const companyParam = params.get('company');
    const featuredOnlyParam = params.get('featuredOnly');
    const newOnlyParam = params.get('newOnly');
    const sortParam = params.get('sort');

    // Update state with URL params
    const newSearchParams = { ...searchParams };
    const newFilters = { ...filters };

    if (keywordParam) newSearchParams.keyword = keywordParam;
    if (locationParam) newSearchParams.location = locationParam;

    if (jobTypeParam) newFilters.jobType = jobTypeParam.split(',');
    if (experienceLevelParam) newFilters.experienceLevel = experienceLevelParam.split(',');

    if (salaryMinParam && salaryMaxParam) {
      newFilters.salary = [
        parseInt(salaryMinParam) || 0,
        parseInt(salaryMaxParam) || 200
      ];
    }

    if (postedWithinParam) newFilters.postedWithin = postedWithinParam;
    if (categoryParam) newFilters.category = categoryParam;
    if (skillsParam) newFilters.skills = skillsParam.split(',');
    if (educationLevelParam) newFilters.educationLevel = educationLevelParam;
    if (isRemoteParam) newFilters.isRemote = isRemoteParam === 'true';
    if (companyParam) newFilters.company = companyParam;
    if (featuredOnlyParam) newFilters.featuredOnly = featuredOnlyParam === 'true';
    if (newOnlyParam) newFilters.newOnly = newOnlyParam === 'true';
    if (sortParam) newFilters.sort = sortParam;

    setSearchParams(newSearchParams);
    setFilters(newFilters);

    // Count active filters
    updateActiveFiltersCount(newSearchParams, newFilters);

    // If there are search params in the URL, perform search
    if (Object.keys(params).length > 0) {
      handleSearch({
        ...newSearchParams,
        ...newFilters
      });
    }
  }, []);

  // Update active filters count
  const updateActiveFiltersCount = (searchParams, currentFilters) => {
    let count = 0;

    // Count basic search params
    if (searchParams.keyword) count++;
    if (searchParams.location) count++;

    // Count advanced filters
    if (currentFilters.jobType && currentFilters.jobType.length > 0) count++;
    if (currentFilters.experienceLevel && currentFilters.experienceLevel.length > 0) count++;
    if (currentFilters.salary && (currentFilters.salary[0] > 0 || currentFilters.salary[1] < 200)) count++;
    if (currentFilters.postedWithin && currentFilters.postedWithin !== 'any') count++;
    if (currentFilters.category) count++;
    if (currentFilters.skills && currentFilters.skills.length > 0) count++;
    if (currentFilters.educationLevel) count++;
    if (currentFilters.isRemote) count++;
    if (currentFilters.company) count++;
    if (currentFilters.featuredOnly) count++;
    if (currentFilters.newOnly) count++;
    if (currentFilters.sort && currentFilters.sort !== 'newest') count++;

    setActiveFiltersCount(count);
  };

  // Handle basic search param changes
  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value
    });
  };

  // Handle filter changes
  const handleFilterChange = (name, value) => {
    setFilters({
      ...filters,
      [name]: value
    });

    // Auto-collapse filters after selection on mobile/small screens
    if (window.innerWidth < 960) {
      setShowAdvancedFilters(false);
    }
  };

  // Handle job type checkbox changes
  const handleJobTypeChange = (type) => {
    const updatedJobTypes = filters.jobType.includes(type)
      ? filters.jobType.filter(t => t !== type)
      : [...filters.jobType, type];

    handleFilterChange('jobType', updatedJobTypes);
  };

  // Handle experience level checkbox changes
  const handleExperienceLevelChange = (level) => {
    const updatedLevels = filters.experienceLevel.includes(level)
      ? filters.experienceLevel.filter(l => l !== level)
      : [...filters.experienceLevel, level];

    handleFilterChange('experienceLevel', updatedLevels);
  };

  // Handle salary range changes
  const handleSalaryChange = (event, newValue) => {
    handleFilterChange('salary', newValue);
  };

  // Handle adding skills
  const handleAddSkill = () => {
    if (skillInput && !filters.skills.includes(skillInput)) {
      handleFilterChange('skills', [...filters.skills, skillInput]);
      setSkillInput('');
    }
  };

  // Handle removing skills
  const handleRemoveSkill = (skill) => {
    handleFilterChange('skills', filters.skills.filter(s => s !== skill));
  };

  // Handle skill input key down (Enter to add)
  const handleSkillInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
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
      educationLevel: '',
      isRemote: false,
      company: '',
      featuredOnly: false,
      newOnly: false,
      sort: 'newest'
    });

    setActiveFiltersCount(0);
  };

  // Handle search
  const handleSearch = (searchData = null) => {
    // If no search data provided, use current state
    const data = searchData || {
      ...searchParams,
      ...filters
    };

    // Update active filters count
    updateActiveFiltersCount(searchParams, filters);

    // Auto-collapse filters after search
    setShowAdvancedFilters(false);

    // Build URL search params
    const urlParams = new URLSearchParams();

    // Add basic search params
    if (data.keyword) urlParams.append('keyword', data.keyword);
    if (data.location) urlParams.append('location', data.location);

    // Add advanced filters
    if (data.jobType && data.jobType.length > 0) urlParams.append('jobType', data.jobType.join(','));
    if (data.experienceLevel && data.experienceLevel.length > 0) urlParams.append('experienceLevel', data.experienceLevel.join(','));

    if (data.salary && (data.salary[0] > 0 || data.salary[1] < 200)) {
      urlParams.append('salaryMin', data.salary[0]);
      urlParams.append('salaryMax', data.salary[1]);
    }

    if (data.postedWithin) urlParams.append('postedWithin', data.postedWithin);
    if (data.category) urlParams.append('category', data.category);
    if (data.skills && data.skills.length > 0) urlParams.append('skills', data.skills.join(','));
    if (data.educationLevel) urlParams.append('educationLevel', data.educationLevel);
    if (data.isRemote) urlParams.append('isRemote', data.isRemote);
    if (data.company) urlParams.append('company', data.company);
    if (data.featuredOnly) urlParams.append('featuredOnly', data.featuredOnly);
    if (data.newOnly) urlParams.append('newOnly', data.newOnly);
    if (data.sort && data.sort !== 'newest') urlParams.append('sort', data.sort);

    // Update URL
    navigate({
      pathname: '/jobs',
      search: urlParams.toString()
    });

    // Call onSearch callback
    if (onSearch) {
      onSearch(data);
    }
  };

  return (
    <Paper elevation={1} sx={{
      p: { xs: 2, sm: 3 },
      borderRadius: 2,
      mb: 3,
      transition: 'all 0.3s ease',
      '&:hover': {
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
      }
    }}>
      {/* Basic Search */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            placeholder="Job title, keywords, or company"
            name="keyword"
            value={searchParams.keyword}
            onChange={handleSearchParamChange}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
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
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(e)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationIcon />
                </InputAdornment>
              )
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Grid>

        <Grid item xs={12} md={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => handleSearch()}
            startIcon={<SearchIcon />}
            size="large"
            sx={{
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,115,230,0.3)',
              },
            }}
          >
            Search
          </Button>
        </Grid>
      </Grid>

      {/* Filter Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Button
          color="primary"
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          startIcon={
            <Badge badgeContent={activeFiltersCount} color="primary">
              <FilterListIcon />
            </Badge>
          }
          endIcon={showAdvancedFilters ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        >
          {showAdvancedFilters ? 'Hide' : 'Show'} Filters
        </Button>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <FormControl sx={{ minWidth: 150, mr: 2 }} size="small">
            <InputLabel id="sort-label">Sort By</InputLabel>
            <Select
              labelId="sort-label"
              value={filters.sort}
              label="Sort By"
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              {sortOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {activeFiltersCount > 0 && (
            <Button
              color="secondary"
              onClick={handleClearFilters}
              startIcon={<ClearIcon />}
              size="small"
            >
              Clear All
            </Button>
          )}
        </Box>
      </Box>

      {/* Advanced Filters */}
      <Collapse in={showAdvancedFilters}>
        <Divider sx={{ my: 2 }} />

        <Grid container spacing={3}>
          {/* Left Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon fontSize="small" sx={{ mr: 1 }} />
              Job Type
            </Typography>
            <FormGroup>
              {jobTypes.map((type) => (
                <FormControlLabel
                  key={type}
                  control={
                    <Checkbox
                      checked={filters.jobType.includes(type)}
                      onChange={() => handleJobTypeChange(type)}
                      size="small"
                    />
                  }
                  label={type}
                />
              ))}
            </FormGroup>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon fontSize="small" sx={{ mr: 1 }} />
              Experience Level
            </Typography>
            <FormGroup>
              {experienceLevels.map((level) => (
                <FormControlLabel
                  key={level}
                  control={
                    <Checkbox
                      checked={filters.experienceLevel.includes(level)}
                      onChange={() => handleExperienceLevelChange(level)}
                      size="small"
                    />
                  }
                  label={level}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Middle Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SalaryIcon fontSize="small" sx={{ mr: 1 }} />
              Salary Range (in thousands)
            </Typography>
            <Box sx={{ px: 2, mb: 3 }}>
              <Slider
                value={filters.salary}
                onChange={handleSalaryChange}
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

            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
              Posted Within
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
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

            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <SchoolIcon fontSize="small" sx={{ mr: 1 }} />
              Education Level
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={filters.educationLevel}
                onChange={(e) => handleFilterChange('educationLevel', e.target.value)}
                displayEmpty
              >
                <MenuItem value="">Any education level</MenuItem>
                {educationLevels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom>
              Category
            </Typography>
            <FormControl fullWidth size="small" sx={{ mb: 3 }}>
              <Select
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
                displayEmpty
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Typography variant="subtitle2" gutterBottom>
              Company
            </Typography>
            <TextField
              fullWidth
              placeholder="Filter by company name"
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              size="small"
              sx={{ mb: 3 }}
            />

            <Typography variant="subtitle2" gutterBottom>
              Skills
            </Typography>
            <Box sx={{ display: 'flex', mb: 1 }}>
              <TextField
                fullWidth
                placeholder="Add skills and press Enter"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={handleSkillInputKeyDown}
                size="small"
                sx={{ mr: 1 }}
              />
              <Button
                variant="outlined"
                onClick={handleAddSkill}
                size="small"
              >
                Add
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
              {filters.skills.map((skill) => (
                <Chip
                  key={skill}
                  label={skill}
                  onDelete={() => handleRemoveSkill(skill)}
                  size="small"
                />
              ))}
            </Box>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.isRemote}
                    onChange={(e) => handleFilterChange('isRemote', e.target.checked)}
                  />
                }
                label="Remote Only"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.featuredOnly}
                    onChange={(e) => handleFilterChange('featuredOnly', e.target.checked)}
                  />
                }
                label="Featured Jobs Only"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.newOnly}
                    onChange={(e) => handleFilterChange('newOnly', e.target.checked)}
                  />
                }
                label="New Jobs Only"
              />
            </FormGroup>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleClearFilters}
            sx={{ mr: 2 }}
          >
            Clear All Filters
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSearch()}
            startIcon={<SearchIcon />}
          >
            Apply Filters
          </Button>
        </Box>
      </Collapse>
    </Paper>
  );
};

export default AdvancedJobFilter;
