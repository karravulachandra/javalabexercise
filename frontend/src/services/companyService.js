import api from './api';
import MockDataService from './mockDataService';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

const CompanyService = {
  // Get all companies with optional filters
  getCompanies: async (filters = {}) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getCompanies with filters:', filters);
        const companies = MockDataService.getCompanies(filters);

        return {
          companies: companies,
          total: companies.length
        };
      }

      const response = await api.get('/companies', { params: filters });
      return response.data;
    } catch (error) {
      console.error('Error fetching companies:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get a single company by ID
  getCompanyById: async (companyId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getCompanyById:', companyId);
        const company = MockDataService.getCompanyById(parseInt(companyId));

        if (!company) {
          throw new Error('Company not found');
        }

        return company;
      }

      const response = await api.get(`/companies/${companyId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching company with ID ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Search companies by name
  searchCompanies: async (name) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for searchCompanies:', name);

        // Filter companies by name
        const nameLower = name.toLowerCase();
        const companies = MockDataService.getCompanies().filter(company =>
          company.name.toLowerCase().includes(nameLower)
        );

        return {
          companies: companies,
          total: companies.length
        };
      }

      const response = await api.get('/companies/search', {
        params: { name }
      });
      return response.data;
    } catch (error) {
      console.error(`Error searching companies with name ${name}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get featured companies
  getFeaturedCompanies: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getFeaturedCompanies');
        const featuredCompanies = MockDataService.getCompanies().filter(company => company.isFeatured);

        return featuredCompanies;
      }

      const response = await api.get('/companies/featured');
      return response.data;
    } catch (error) {
      console.error('Error fetching featured companies:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get companies by industry
  getCompaniesByIndustry: async (industry) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getCompaniesByIndustry:', industry);

        // Filter companies by industry
        const industryLower = industry.toLowerCase();
        const companies = MockDataService.getCompanies().filter(company =>
          company.industry && company.industry.toLowerCase().includes(industryLower)
        );

        return {
          companies: companies,
          total: companies.length
        };
      }

      const response = await api.get('/companies/industry', {
        params: { industry }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching companies for industry ${industry}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Follow a company
  followCompany: async (companyId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for followCompany:', companyId);
        return { success: true };
      }

      const response = await api.post(`/companies/${companyId}/follow`);
      return response.data;
    } catch (error) {
      console.error(`Error following company ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Unfollow a company
  unfollowCompany: async (companyId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for unfollowCompany:', companyId);
        return { success: true };
      }

      const response = await api.delete(`/companies/${companyId}/follow`);
      return response.data;
    } catch (error) {
      console.error(`Error unfollowing company ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get followed companies for the current user
  getFollowedCompanies: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getFollowedCompanies');
        // Return first 2 companies as followed
        return MockDataService.getCompanies().slice(0, 2);
      }

      const response = await api.get('/companies/followed');
      return response.data;
    } catch (error) {
      console.error('Error fetching followed companies:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Create a company profile (for employers)
  createCompany: async (companyData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for createCompany:', companyData);

        // Create a new company with a unique ID
        const newCompany = {
          id: MockDataService.companies.length + 1,
          ...companyData,
          logo: companyData.logo || 'https://via.placeholder.com/150',
          rating: 0,
          reviews: 0,
          isVerified: false,
          isFeatured: false
        };

        // Add the company to mock data
        MockDataService.companies.push(newCompany);

        return { success: true, company: newCompany };
      }

      const response = await api.post('/companies', companyData);
      return response.data;
    } catch (error) {
      console.error('Error creating company:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Update a company profile (for employers)
  updateCompany: async (companyId, companyData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for updateCompany:', { companyId, companyData });

        // Find the company in mock data
        const companies = MockDataService.companies;
        const companyIndex = companies.findIndex(company => company.id === parseInt(companyId));

        if (companyIndex === -1) {
          throw new Error('Company not found');
        }

        // Update the company
        const updatedCompany = {
          ...companies[companyIndex],
          ...companyData,
          id: parseInt(companyId) // Ensure ID doesn't change
        };

        // Replace the company in mock data
        companies[companyIndex] = updatedCompany;

        return { success: true, company: updatedCompany };
      }

      const response = await api.put(`/companies/${companyId}`, companyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating company with ID ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Upload company logo
  uploadLogo: async (companyId, logoFile) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for uploadLogo:', { companyId, logoFile });

        // Find the company in mock data
        const companies = MockDataService.companies;
        const companyIndex = companies.findIndex(company => company.id === parseInt(companyId));

        if (companyIndex === -1) {
          throw new Error('Company not found');
        }

        // In a real app, we would upload the file to a server
        // For mock data, we'll just pretend we did and return a placeholder URL
        const mockLogoUrl = 'https://via.placeholder.com/150';

        // Update the company's logo
        companies[companyIndex].logo = mockLogoUrl;

        return {
          success: true,
          logoUrl: mockLogoUrl,
          company: companies[companyIndex]
        };
      }

      const formData = new FormData();
      formData.append('logo', logoFile);

      const response = await api.post(`/companies/${companyId}/logo`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error uploading logo for company ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get company reviews
  getCompanyReviews: async (companyId) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getCompanyReviews:', companyId);

        // Mock company reviews
        const mockReviews = [
          {
            id: 1,
            companyId: parseInt(companyId),
            userId: 1,
            rating: 4.5,
            title: 'Great place to work',
            review: 'I had a wonderful experience working at this company. The culture is amazing and the benefits are great.',
            pros: 'Good benefits, great culture, work-life balance',
            cons: 'Sometimes communication could be better',
            date: '2023-05-15',
            isVerified: true
          },
          {
            id: 2,
            companyId: parseInt(companyId),
            userId: 2,
            rating: 3.8,
            title: 'Good company with some challenges',
            review: 'Overall a good place to work, but there are some challenges with management.',
            pros: 'Competitive salary, good colleagues',
            cons: 'Management can be disorganized at times',
            date: '2023-04-20',
            isVerified: true
          }
        ];

        return mockReviews;
      }

      const response = await api.get(`/companies/${companyId}/reviews`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for company ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Add a company review
  addCompanyReview: async (companyId, reviewData) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for addCompanyReview:', { companyId, reviewData });

        // Create a new review
        const newReview = {
          id: Math.floor(Math.random() * 1000) + 10,
          companyId: parseInt(companyId),
          userId: 1, // Current user ID
          rating: reviewData.rating,
          title: reviewData.title,
          review: reviewData.review,
          pros: reviewData.pros || '',
          cons: reviewData.cons || '',
          date: new Date().toISOString().split('T')[0],
          isVerified: false
        };

        // Update company rating in mock data
        const companies = MockDataService.companies;
        const companyIndex = companies.findIndex(company => company.id === parseInt(companyId));

        if (companyIndex !== -1) {
          const company = companies[companyIndex];
          const totalReviews = company.reviews + 1;
          const newRating = ((company.rating * company.reviews) + reviewData.rating) / totalReviews;

          companies[companyIndex] = {
            ...company,
            rating: parseFloat(newRating.toFixed(1)),
            reviews: totalReviews
          };
        }

        return { success: true, review: newReview };
      }

      const response = await api.post(`/companies/${companyId}/reviews`, reviewData);
      return response.data;
    } catch (error) {
      console.error(`Error adding review for company ${companyId}:`, error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default CompanyService;
