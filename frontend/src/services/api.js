import axios from 'axios';
import MockDataService from './mockDataService';

// Create an axios instance with default config
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a timeout to prevent long-hanging requests
  timeout: 10000,
});

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

// Add a request interceptor to attach the auth token to every request
// and to handle mock data
api.interceptors.request.use(
  (config) => {
    // Add auth token to headers
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // If we're using mock data, intercept the request and return mock data
    if (USE_MOCK_DATA) {
      const url = config.url;
      const method = config.method;

      // Create a handler for mock responses
      const mockResponse = (data) => {
        return new Promise((resolve) => {
          console.log(`Intercepting ${method} request to ${url} with mock data`);
          resolve({
            data: data,
            status: 200,
            statusText: 'OK',
            headers: {},
            config: config
          });
        });
      };

      // Jobs endpoints
      if (url.includes('/jobs')) {
        if (url.match(/\/jobs\/\d+$/)) {
          // Single job request - extract job ID from URL
          const jobId = parseInt(url.split('/').pop());
          const job = MockDataService.getJobById(jobId);
          if (job) {
            return mockResponse(job);
          }
        } else if (url.includes('/jobs/recommended')) {
          // Recommended jobs
          return mockResponse(MockDataService.getJobs().slice(0, 3));
        } else if (url.includes('/jobs/saved')) {
          // Saved jobs
          return mockResponse(MockDataService.getJobs().filter(job => job.isSaved));
        } else {
          // All jobs or filtered jobs
          const params = config.params || {};
          return mockResponse({
            jobs: MockDataService.getJobs(params),
            total: MockDataService.getJobs().length,
            page: params.page || 1,
            limit: params.limit || 10
          });
        }
      }

      // Companies endpoints
      if (url.includes('/companies')) {
        if (url.match(/\/companies\/\d+$/)) {
          // Single company request
          const companyId = parseInt(url.split('/').pop());
          const company = MockDataService.getCompanyById(companyId);
          if (company) {
            return mockResponse(company);
          }
        } else if (url.includes('/companies/featured')) {
          // Featured companies
          return mockResponse(MockDataService.getCompanies().filter(company => company.isFeatured));
        } else {
          // All companies or filtered companies
          const params = config.params || {};
          return mockResponse(MockDataService.getCompanies(params));
        }
      }

      // Applications endpoints
      if (url.includes('/applications')) {
        return mockResponse(MockDataService.getApplications());
      }

      // User endpoints
      if (url.includes('/users/profile')) {
        return mockResponse(MockDataService.getCurrentUser());
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle common errors and mock data
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error);

    // If we're using mock data, intercept the request and return mock data
    if (USE_MOCK_DATA) {
      const url = error.config.url;
      const method = error.config.method;
      console.log(`Intercepting ${method} request to ${url} with mock data`);

      // Jobs endpoints
      if (url.includes('/jobs')) {
        if (url.match(/\/jobs\/\d+$/)) {
          // Single job request - extract job ID from URL
          const jobId = parseInt(url.split('/').pop());
          return Promise.resolve({
            data: MockDataService.getJobById(jobId)
          });
        } else if (url.includes('/jobs/recommended')) {
          // Recommended jobs
          return Promise.resolve({
            data: MockDataService.getJobs().slice(0, 3)
          });
        } else if (url.includes('/jobs/saved')) {
          // Saved jobs
          return Promise.resolve({
            data: MockDataService.getJobs().filter(job => job.isSaved)
          });
        } else {
          // All jobs or filtered jobs
          const params = error.config.params || {};
          return Promise.resolve({
            data: {
              jobs: MockDataService.getJobs(params),
              total: MockDataService.getJobs().length,
              page: params.page || 1,
              limit: params.limit || 10
            }
          });
        }
      }

      // Companies endpoints
      if (url.includes('/companies')) {
        if (url.match(/\/companies\/\d+$/)) {
          // Single company request
          const companyId = parseInt(url.split('/').pop());
          return Promise.resolve({
            data: MockDataService.getCompanyById(companyId)
          });
        } else if (url.includes('/companies/featured')) {
          // Featured companies
          return Promise.resolve({
            data: MockDataService.getCompanies().filter(company => company.isFeatured)
          });
        } else {
          // All companies or filtered companies
          const params = error.config.params || {};
          return Promise.resolve({
            data: MockDataService.getCompanies(params)
          });
        }
      }

      // Applications endpoints
      if (url.includes('/applications')) {
        return Promise.resolve({
          data: MockDataService.getApplications()
        });
      }

      // User endpoints
      if (url.includes('/users/profile')) {
        return Promise.resolve({
          data: MockDataService.getCurrentUser()
        });
      }

      // Default empty response
      return Promise.resolve({
        data: []
      });
    }

    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      // Clear local storage and redirect to login
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }

    // Handle network errors
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network error or timeout:', error.message);
    }

    return Promise.reject(error);
  }
);

export default api;
