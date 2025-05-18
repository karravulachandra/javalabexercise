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
  Badge,
  Rating
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  Sort as SortIcon,
  Star as StarIcon,
  CalendarToday as CalendarIcon,
  Work as WorkIcon
} from '@mui/icons-material';
import { SearchService } from '../../services';

const CompanyFilter = ({ onSearch, initialFilters = {} }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [industries, setIndustries] = useState([]);
  const [loading, setLoading] = useState(false);

  // Basic search params
  const [searchParams, setSearchParams] = useState({
    name: '',
    location: '',
    ...initialFilters
  });

  // Advanced filters
  const [filters, setFilters] = useState({
    industry: [],
    size: [],
    foundedStart: '',
    foundedEnd: '',
    minRating: 0,
    hasOpenPositions: false,
    verifiedOnly: false,
    featuredOnly: false,
    sort: 'name_asc',
    ...initialFilters
  });

  // Active filters count for badge
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Company sizes
  const companySizes = [
    '1-10 employees',
    '11-50 employees',
    '51-200 employees',
    '201-500 employees',
    '501-1,000 employees',
    '1,001-5,000 employees',
    '5,000-10,000 employees',
    '10,000+ employees'
  ];

  // Sort options
  const sortOptions = [
    { value: 'name_asc', label: 'Name (A-Z)' },
    { value: 'name_desc', label: 'Name (Z-A)' },
    { value: 'rating_high', label: 'Highest Rating' },
    { value: 'rating_low', label: 'Lowest Rating' },
    { value: 'founded_newest', label: 'Newest Companies' },
    { value: 'founded_oldest', label: 'Oldest Companies' },
    { value: 'open_positions', label: 'Most Open Positions' },
    { value: 'reviews', label: 'Most Reviews' }
  ];

  // Fetch industries on component mount
  useEffect(() => {
    const fetchIndustries = async () => {
      try {
        const industriesData = await SearchService.getIndustryTypes();
        setIndustries(industriesData);
      } catch (error) {
        console.error('Error fetching industries:', error);
      }
    };

    fetchIndustries();
  }, []);

  // Parse URL search params on component mount
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    // Basic search params
    const nameParam = params.get('name');
    const locationParam = params.get('location');

    // Advanced filters
    const industryParam = params.get('industry');
    const sizeParam = params.get('size');
    const foundedStartParam = params.get('foundedStart');
    const foundedEndParam = params.get('foundedEnd');
    const minRatingParam = params.get('minRating');
    const hasOpenPositionsParam = params.get('hasOpenPositions');
    const verifiedOnlyParam = params.get('verifiedOnly');
    const featuredOnlyParam = params.get('featuredOnly');
    const sortParam = params.get('sort');

    // Update state with URL params
    const newSearchParams = { ...searchParams };
    const newFilters = { ...filters };

    if (nameParam) newSearchParams.name = nameParam;
    if (locationParam) newSearchParams.location = locationParam;

    if (industryParam) newFilters.industry = industryParam.split(',');
    if (sizeParam) newFilters.size = sizeParam.split(',');
    if (foundedStartParam) newFilters.foundedStart = foundedStartParam;
    if (foundedEndParam) newFilters.foundedEnd = foundedEndParam;
    if (minRatingParam) newFilters.minRating = parseFloat(minRatingParam);
    if (hasOpenPositionsParam) newFilters.hasOpenPositions = hasOpenPositionsParam === 'true';
    if (verifiedOnlyParam) newFilters.verifiedOnly = verifiedOnlyParam === 'true';
    if (featuredOnlyParam) newFilters.featuredOnly = featuredOnlyParam === 'true';
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
    if (searchParams.name) count++;
    if (searchParams.location) count++;

    // Count advanced filters
    if (currentFilters.industry && currentFilters.industry.length > 0) count++;
    if (currentFilters.size && currentFilters.size.length > 0) count++;
    if (currentFilters.foundedStart) count++;
    if (currentFilters.foundedEnd) count++;
    if (currentFilters.minRating > 0) count++;
    if (currentFilters.hasOpenPositions) count++;
    if (currentFilters.verifiedOnly) count++;
    if (currentFilters.featuredOnly) count++;
    if (currentFilters.sort && currentFilters.sort !== 'name_asc') count++;

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
  };

  // Handle industry checkbox changes
  const handleIndustryChange = (industry) => {
    const updatedIndustries = filters.industry.includes(industry)
      ? filters.industry.filter(i => i !== industry)
      : [...filters.industry, industry];

    handleFilterChange('industry', updatedIndustries);
  };

  // Handle company size checkbox changes
  const handleSizeChange = (size) => {
    const updatedSizes = filters.size.includes(size)
      ? filters.size.filter(s => s !== size)
      : [...filters.size, size];

    handleFilterChange('size', updatedSizes);
  };

  // Handle rating change
  const handleRatingChange = (event, newValue) => {
    handleFilterChange('minRating', newValue);
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSearchParams({
      name: '',
      location: ''
    });

    setFilters({
      industry: [],
      size: [],
      foundedStart: '',
      foundedEnd: '',
      minRating: 0,
      hasOpenPositions: false,
      verifiedOnly: false,
      featuredOnly: false,
      sort: 'name_asc'
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

    // Build URL search params
    const urlParams = new URLSearchParams();

    // Add basic search params
    if (data.name) urlParams.append('name', data.name);
    if (data.location) urlParams.append('location', data.location);

    // Add advanced filters
    if (data.industry && data.industry.length > 0) urlParams.append('industry', data.industry.join(','));
    if (data.size && data.size.length > 0) urlParams.append('size', data.size.join(','));
    if (data.foundedStart) urlParams.append('foundedStart', data.foundedStart);
    if (data.foundedEnd) urlParams.append('foundedEnd', data.foundedEnd);
    if (data.minRating > 0) urlParams.append('minRating', data.minRating);
    if (data.hasOpenPositions) urlParams.append('hasOpenPositions', data.hasOpenPositions);
    if (data.verifiedOnly) urlParams.append('verifiedOnly', data.verifiedOnly);
    if (data.featuredOnly) urlParams.append('featuredOnly', data.featuredOnly);
    if (data.sort && data.sort !== 'name_asc') urlParams.append('sort', data.sort);

    // Update URL
    navigate({
      pathname: '/companies',
      search: urlParams.toString()
    });

    // Call onSearch callback
    if (onSearch) {
      onSearch(data);
    }
  };

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
      {/* Basic Search */}
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            placeholder="Company name"
            name="name"
            value={searchParams.name}
            onChange={handleSearchParamChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon />
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <TextField
            fullWidth
            placeholder="City, state, or country"
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
            onClick={() => handleSearch()}
            startIcon={<SearchIcon />}
            size="large"
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
              <BusinessIcon fontSize="small" sx={{ mr: 1 }} />
              Industry
            </Typography>
            <FormGroup sx={{ maxHeight: 300, overflowY: 'auto' }}>
              {industries.map((industry) => (
                <FormControlLabel
                  key={industry.id}
                  control={
                    <Checkbox
                      checked={filters.industry.includes(industry.id)}
                      onChange={() => handleIndustryChange(industry.id)}
                      size="small"
                    />
                  }
                  label={industry.name}
                />
              ))}
            </FormGroup>
          </Grid>

          {/* Middle Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <WorkIcon fontSize="small" sx={{ mr: 1 }} />
              Company Size
            </Typography>
            <FormGroup>
              {companySizes.map((size) => (
                <FormControlLabel
                  key={size}
                  control={
                    <Checkbox
                      checked={filters.size.includes(size)}
                      onChange={() => handleSizeChange(size)}
                      size="small"
                    />
                  }
                  label={size}
                />
              ))}
            </FormGroup>

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <StarIcon fontSize="small" sx={{ mr: 1 }} />
              Minimum Rating
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2 }}>
              <Rating
                name="minRating"
                value={filters.minRating}
                precision={0.5}
                onChange={handleRatingChange}
              />
              <Typography variant="body2" sx={{ ml: 2 }}>
                {filters.minRating} stars & up
              </Typography>
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="subtitle2" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
              Founded Year Range
            </Typography>
            <Grid container spacing={2} sx={{ mb: 3 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="From"
                  type="number"
                  placeholder="e.g. 2000"
                  value={filters.foundedStart}
                  onChange={(e) => handleFilterChange('foundedStart', e.target.value)}
                  size="small"
                  InputProps={{ inputProps: { min: 1800, max: new Date().getFullYear() } }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="To"
                  type="number"
                  placeholder="e.g. 2023"
                  value={filters.foundedEnd}
                  onChange={(e) => handleFilterChange('foundedEnd', e.target.value)}
                  size="small"
                  InputProps={{ inputProps: { min: 1800, max: new Date().getFullYear() } }}
                />
              </Grid>
            </Grid>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.hasOpenPositions}
                    onChange={(e) => handleFilterChange('hasOpenPositions', e.target.checked)}
                  />
                }
                label="Companies with Open Positions"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.verifiedOnly}
                    onChange={(e) => handleFilterChange('verifiedOnly', e.target.checked)}
                  />
                }
                label="Verified Companies Only"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={filters.featuredOnly}
                    onChange={(e) => handleFilterChange('featuredOnly', e.target.checked)}
                  />
                }
                label="Featured Companies Only"
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

export default CompanyFilter;
