import axios from 'axios';
import MockDataService from './mockDataService';

const API_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add a timeout to prevent long-hanging requests
  timeout: 10000,
});

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

// Add auth token to requests and handle mock data
apiClient.interceptors.request.use(
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

      // Dashboard data
      if (url.includes('/dashboard')) {
        return mockResponse({
          stats: {
            totalApplications: MockDataService.applications.length,
            profileViews: 45,
            interviews: 2,
            offers: 1
          },
          recentApplications: MockDataService.applications.slice(0, 3),
          recommendedJobs: MockDataService.jobs.slice(0, 3),
          applicationStatus: {
            applied: 5,
            viewed: 3,
            interview: 2,
            offer: 1,
            rejected: 1
          },
          applicationTrends: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            applications: [5, 8, 12, 7, 10, 15],
            interviews: [2, 3, 5, 3, 4, 6]
          }
        });
      }

      // Jobs endpoints
      if (url.includes('/jobs')) {
        if (url.match(/\/jobs\/\d+$/)) {
          // Single job request
          const jobId = parseInt(url.split('/').pop());
          const job = MockDataService.getJobById(jobId);
          if (job) {
            return mockResponse(job);
          }
        } else if (url.includes('/jobs/recommended')) {
          // Recommended jobs
          return mockResponse(MockDataService.getJobs().slice(0, 3));
        } else {
          // All jobs
          return mockResponse(MockDataService.getJobs());
        }
      }

      // Applications endpoints
      if (url.includes('/applications')) {
        return mockResponse(MockDataService.getApplications());
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors and mock data
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Client Error:', error);

    // If we're using mock data, intercept the request and return mock data
    if (USE_MOCK_DATA) {
      const url = error.config.url;
      const method = error.config.method;
      console.log(`Intercepting ${method} request to ${url} with mock data (error handler)`);

      // Dashboard data
      if (url.includes('/dashboard')) {
        return Promise.resolve({
          data: {
            stats: {
              totalApplications: MockDataService.applications.length,
              profileViews: 45,
              interviews: 2,
              offers: 1
            },
            recentApplications: MockDataService.applications.slice(0, 3),
            recommendedJobs: MockDataService.jobs.slice(0, 3),
            applicationStatus: {
              applied: 5,
              viewed: 3,
              interview: 2,
              offer: 1,
              rejected: 1
            },
            applicationTrends: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
              applications: [5, 8, 12, 7, 10, 15],
              interviews: [2, 3, 5, 3, 4, 6]
            }
          }
        });
      }

      // Jobs endpoints
      if (url.includes('/jobs')) {
        if (url.match(/\/jobs\/\d+$/)) {
          // Single job request
          const jobId = parseInt(url.split('/').pop());
          return Promise.resolve({
            data: MockDataService.getJobById(jobId)
          });
        } else if (url.includes('/jobs/recommended')) {
          // Recommended jobs
          return Promise.resolve({
            data: MockDataService.getJobs().slice(0, 3)
          });
        } else {
          // All jobs
          return Promise.resolve({
            data: MockDataService.getJobs()
          });
        }
      }

      // Applications endpoints
      if (url.includes('/applications')) {
        return Promise.resolve({
          data: MockDataService.getApplications()
        });
      }

      // Default empty response
      return Promise.resolve({
        data: []
      });
    }

    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }

    // Handle network errors
    if (error.code === 'ECONNABORTED' || !error.response) {
      console.error('Network error or timeout:', error.message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;
