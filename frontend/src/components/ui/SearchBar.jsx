import { useState, useEffect, useRef } from 'react';
import { 
  Box, Paper, InputBase, IconButton, Divider, List, ListItem, 
  ListItemText, Typography, CircularProgress, Popper, ClickAwayListener 
} from '@mui/material';
import { Search as SearchIcon, LocationOn, Clear as ClearIcon } from '@mui/icons-material';
import apiClient from '../../services/apiClient';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const searchRef = useRef(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!keyword || keyword.length < 2) {
        setSuggestions([]);
        return;
      }
      
      try {
        setLoading(true);
        // In a real app, this would be an API call
        // For now, we'll simulate a delay and return mock data
        setTimeout(() => {
          const mockSuggestions = [
            { id: 1, title: 'Software Engineer', type: 'job' },
            { id: 2, title: 'Software Developer', type: 'job' },
            { id: 3, title: 'Software Architect', type: 'job' },
            { id: 4, title: 'Google', type: 'company' },
            { id: 5, title: 'Microsoft', type: 'company' }
          ].filter(item => 
            item.title.toLowerCase().includes(keyword.toLowerCase())
          );
          
          setSuggestions(mockSuggestions);
          setLoading(false);
        }, 300);
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setLoading(false);
      }
    };
    
    const timeoutId = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [keyword]);

  const handleSearch = () => {
    if (onSearch) {
      onSearch({ keyword, location });
    }
    handleClose();
  };

  const handleKeywordChange = (e) => {
    const value = e.target.value;
    setKeyword(value);
    setAnchorEl(searchRef.current);
  };

  const handleSuggestionClick = (suggestion) => {
    setKeyword(suggestion.title);
    handleClose();
    handleSearch();
  };

  const handleClearKeyword = () => {
    setKeyword('');
    setSuggestions([]);
  };

  const handleClearLocation = () => {
    setLocation('');
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ width: '100%', position: 'relative' }}>
      <Paper
        ref={searchRef}
        sx={{
          p: '2px 4px',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 2
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, position: 'relative' }}>
          <IconButton sx={{ p: '10px' }} aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Job title, keywords, or company"
            value={keyword}
            onChange={handleKeywordChange}
            onKeyDown={handleKeyDown}
          />
          {keyword && (
            <IconButton size="small" onClick={handleClearKeyword}>
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, position: 'relative' }}>
          <IconButton sx={{ p: '10px' }} aria-label="location">
            <LocationOn />
          </IconButton>
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          {location && (
            <IconButton size="small" onClick={handleClearLocation}>
              <ClearIcon fontSize="small" />
            </IconButton>
          )}
        </Box>
        
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        
        <IconButton 
          color="primary" 
          sx={{ p: '10px' }} 
          aria-label="search button"
          onClick={handleSearch}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      
      <Popper 
        open={open && suggestions.length > 0} 
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: anchorEl?.offsetWidth, zIndex: 1300 }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={{ mt: 1, maxHeight: 300, overflow: 'auto', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                <CircularProgress size={24} />
              </Box>
            ) : (
              <List sx={{ p: 0 }}>
                {suggestions.map((suggestion) => (
                  <ListItem 
                    key={suggestion.id} 
                    button 
                    onClick={() => handleSuggestionClick(suggestion)}
                    sx={{ '&:hover': { bgcolor: 'grey.100' } }}
                  >
                    <ListItemText 
                      primary={suggestion.title}
                      secondary={
                        <Typography variant="caption" color="text.secondary">
                          {suggestion.type === 'job' ? 'Job Title' : 'Company'}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default SearchBar;
