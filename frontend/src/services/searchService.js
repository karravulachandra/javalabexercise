import api from './api';
import MockDataService from './mockDataService';

// Flag to use mock data instead of real API calls
const USE_MOCK_DATA = true;

const SearchService = {
  // Search jobs by keyword and location
  searchJobs: async (params) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for searchJobs:', params);

        // Get all jobs from mock data
        let filteredJobs = MockDataService.getJobs();

        // Apply filters
        if (params.keyword) {
          const keyword = params.keyword.toLowerCase();
          filteredJobs = filteredJobs.filter(job =>
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.description.toLowerCase().includes(keyword) ||
            job.skills.some(skill => skill.toLowerCase().includes(keyword))
          );
        }

        if (params.location) {
          const location = params.location.toLowerCase();
          filteredJobs = filteredJobs.filter(job =>
            job.location.toLowerCase().includes(location)
          );
        }

        // Job Type filter - handle both array and comma-separated string
        if (params.jobType && (Array.isArray(params.jobType) ? params.jobType.length > 0 : params.jobType.length > 0)) {
          const jobTypes = Array.isArray(params.jobType) ? params.jobType : params.jobType.split(',');
          filteredJobs = filteredJobs.filter(job =>
            jobTypes.some(type => job.jobType && job.jobType.toLowerCase().includes(type.toLowerCase()))
          );
        }

        // Experience Level filter - handle both array and comma-separated string
        if (params.experienceLevel && (Array.isArray(params.experienceLevel) ? params.experienceLevel.length > 0 : params.experienceLevel.length > 0)) {
          const experienceLevels = Array.isArray(params.experienceLevel) ?
            params.experienceLevel : params.experienceLevel.split(',');
          filteredJobs = filteredJobs.filter(job =>
            job.experienceLevel && experienceLevels.some(level =>
              job.experienceLevel.toLowerCase().includes(level.toLowerCase())
            )
          );
        }

        // Category filter
        if (params.category && params.category.length > 0) {
          if (Array.isArray(params.category)) {
            filteredJobs = filteredJobs.filter(job =>
              job.category && params.category.includes(job.category)
            );
          } else {
            filteredJobs = filteredJobs.filter(job =>
              job.category && job.category.toLowerCase() === params.category.toLowerCase()
            );
          }
        }

        // Salary Range filter
        if (params.salaryMin !== undefined || params.salaryMax !== undefined) {
          const minSalary = params.salaryMin || 0;
          const maxSalary = params.salaryMax || 1000;

          filteredJobs = filteredJobs.filter(job => {
            // Extract salary range from string like "$50K - $70K"
            if (!job.salary) return true;

            const salaryMatch = job.salary.match(/\$(\d+)K\s*-\s*\$(\d+)K/);
            if (salaryMatch) {
              const jobMinSalary = parseInt(salaryMatch[1]);
              const jobMaxSalary = parseInt(salaryMatch[2]);

              // Check if job salary range overlaps with filter range
              return (jobMaxSalary >= minSalary && jobMinSalary <= maxSalary);
            }
            return true;
          });
        }

        // Posted Within filter
        if (params.postedWithin) {
          const now = new Date();
          let daysAgo;

          switch (params.postedWithin) {
            case '1':
              daysAgo = 1;
              break;
            case '7':
              daysAgo = 7;
              break;
            case '14':
              daysAgo = 14;
              break;
            case '30':
              daysAgo = 30;
              break;
            default:
              daysAgo = null;
          }

          if (daysAgo) {
            const cutoffDate = new Date(now.setDate(now.getDate() - daysAgo));
            filteredJobs = filteredJobs.filter(job => {
              const postedDate = new Date(job.postedDate);
              return postedDate >= cutoffDate;
            });
          }
        }

        // Skills filter
        if (params.skills && (Array.isArray(params.skills) ? params.skills.length > 0 : params.skills.length > 0)) {
          const skills = Array.isArray(params.skills) ? params.skills : params.skills.split(',');
          filteredJobs = filteredJobs.filter(job =>
            job.skills && skills.every(skill =>
              job.skills.some(jobSkill => jobSkill.toLowerCase().includes(skill.toLowerCase()))
            )
          );
        }

        // Remote Only filter
        if (params.isRemote === true || params.isRemote === 'true') {
          filteredJobs = filteredJobs.filter(job =>
            job.jobType && job.jobType.toLowerCase().includes('remote')
          );
        }

        // Education Level filter
        if (params.educationLevel) {
          filteredJobs = filteredJobs.filter(job =>
            job.educationLevel && job.educationLevel.toLowerCase().includes(params.educationLevel.toLowerCase())
          );
        }

        // Company filter
        if (params.company) {
          filteredJobs = filteredJobs.filter(job =>
            job.company && job.company.toLowerCase().includes(params.company.toLowerCase())
          );
        }

        // Featured Jobs filter
        if (params.featuredOnly === true || params.featuredOnly === 'true') {
          filteredJobs = filteredJobs.filter(job => job.isFeatured);
        }

        // New Jobs filter
        if (params.newOnly === true || params.newOnly === 'true') {
          filteredJobs = filteredJobs.filter(job => job.isNew);
        }

        // Sort jobs
        if (params.sort) {
          switch (params.sort) {
            case 'newest':
              filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
              break;
            case 'oldest':
              filteredJobs.sort((a, b) => new Date(a.postedDate) - new Date(b.postedDate));
              break;
            case 'salary_high':
              filteredJobs.sort((a, b) => {
                // Extract salary values from strings like "$50K - $70K"
                const aMatch = a.salary ? a.salary.match(/\$(\d+)K/) : null;
                const bMatch = b.salary ? b.salary.match(/\$(\d+)K/) : null;
                const aSalary = aMatch ? parseInt(aMatch[1]) : 0;
                const bSalary = bMatch ? parseInt(bMatch[1]) : 0;
                return bSalary - aSalary;
              });
              break;
            case 'salary_low':
              filteredJobs.sort((a, b) => {
                // Extract salary values from strings like "$50K - $70K"
                const aMatch = a.salary ? a.salary.match(/\$(\d+)K/) : null;
                const bMatch = b.salary ? b.salary.match(/\$(\d+)K/) : null;
                const aSalary = aMatch ? parseInt(aMatch[1]) : 0;
                const bSalary = bMatch ? parseInt(bMatch[1]) : 0;
                return aSalary - bSalary;
              });
              break;
            case 'company_az':
              filteredJobs.sort((a, b) => a.company.localeCompare(b.company));
              break;
            case 'company_za':
              filteredJobs.sort((a, b) => b.company.localeCompare(a.company));
              break;
            case 'title_az':
              filteredJobs.sort((a, b) => a.title.localeCompare(b.title));
              break;
            case 'title_za':
              filteredJobs.sort((a, b) => b.title.localeCompare(a.title));
              break;
            case 'relevance':
              // In a real app, this would be handled by the backend
              break;
            default:
              // Default to newest
              filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
              break;
          }
        } else {
          // Default sort by newest
          filteredJobs.sort((a, b) => new Date(b.postedDate) - new Date(a.postedDate));
        }

        // Pagination
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedJobs = filteredJobs.slice(startIndex, endIndex);

        return {
          jobs: paginatedJobs,
          total: filteredJobs.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(filteredJobs.length / limit)
        };
      }

      const response = await api.get('/jobs/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Search companies by name with advanced filtering
  searchCompanies: async (params) => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for searchCompanies:', params);

        // Get all companies from mock data
        let filteredCompanies = MockDataService.getCompanies();

        // Apply basic filters
        if (params.name) {
          const name = params.name.toLowerCase();
          filteredCompanies = filteredCompanies.filter(company =>
            company.name.toLowerCase().includes(name)
          );
        }

        // Industry filter - handle both array and comma-separated string
        if (params.industry) {
          const industries = Array.isArray(params.industry) ?
            params.industry :
            (typeof params.industry === 'string' && params.industry.includes(',') ?
              params.industry.split(',') :
              [params.industry]);

          if (industries.length > 0) {
            filteredCompanies = filteredCompanies.filter(company => {
              // Handle companies with multiple industries (comma-separated)
              const companyIndustries = company.industry.includes(',') ?
                company.industry.split(',').map(i => i.trim()) :
                [company.industry];

              return industries.some(industry =>
                companyIndustries.some(companyIndustry =>
                  companyIndustry.toLowerCase().includes(industry.toLowerCase())
                )
              );
            });
          }
        }

        if (params.location) {
          const location = params.location.toLowerCase();
          filteredCompanies = filteredCompanies.filter(company =>
            company.location.toLowerCase().includes(location)
          );
        }

        // Company size filter
        if (params.size) {
          const sizes = Array.isArray(params.size) ? params.size : [params.size];
          filteredCompanies = filteredCompanies.filter(company =>
            sizes.some(size => company.size && company.size.includes(size))
          );
        }

        // Founded year range filter
        if (params.foundedStart || params.foundedEnd) {
          const startYear = params.foundedStart || 0;
          const endYear = params.foundedEnd || new Date().getFullYear();

          filteredCompanies = filteredCompanies.filter(company =>
            company.founded && company.founded >= startYear && company.founded <= endYear
          );
        }

        // Rating filter
        if (params.minRating) {
          const minRating = parseFloat(params.minRating);
          filteredCompanies = filteredCompanies.filter(company =>
            company.rating && company.rating >= minRating
          );
        }

        // Open positions filter
        if (params.hasOpenPositions === true || params.hasOpenPositions === 'true') {
          filteredCompanies = filteredCompanies.filter(company =>
            company.openPositions && company.openPositions > 0
          );
        }

        // Verified companies filter
        if (params.verifiedOnly === true || params.verifiedOnly === 'true') {
          filteredCompanies = filteredCompanies.filter(company => company.isVerified);
        }

        // Featured companies filter
        if (params.featuredOnly === true || params.featuredOnly === 'true') {
          filteredCompanies = filteredCompanies.filter(company => company.isFeatured);
        }

        // Sort companies
        if (params.sort) {
          switch (params.sort) {
            case 'name_asc':
              filteredCompanies.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'name_desc':
              filteredCompanies.sort((a, b) => b.name.localeCompare(a.name));
              break;
            case 'rating_high':
              filteredCompanies.sort((a, b) => (b.rating || 0) - (a.rating || 0));
              break;
            case 'rating_low':
              filteredCompanies.sort((a, b) => (a.rating || 0) - (b.rating || 0));
              break;
            case 'founded_newest':
              filteredCompanies.sort((a, b) => (b.founded || 0) - (a.founded || 0));
              break;
            case 'founded_oldest':
              filteredCompanies.sort((a, b) => (a.founded || 0) - (b.founded || 0));
              break;
            case 'open_positions':
              filteredCompanies.sort((a, b) => (b.openPositions || 0) - (a.openPositions || 0));
              break;
            case 'reviews':
              filteredCompanies.sort((a, b) => (b.reviews || 0) - (a.reviews || 0));
              break;
            default:
              // Default to featured first, then alphabetical
              filteredCompanies.sort((a, b) => {
                if (a.isFeatured && !b.isFeatured) return -1;
                if (!a.isFeatured && b.isFeatured) return 1;
                return a.name.localeCompare(b.name);
              });
              break;
          }
        } else {
          // Default sort: featured first, then alphabetical
          filteredCompanies.sort((a, b) => {
            if (a.isFeatured && !b.isFeatured) return -1;
            if (!a.isFeatured && b.isFeatured) return 1;
            return a.name.localeCompare(b.name);
          });
        }

        // Pagination
        const page = params.page || 1;
        const limit = params.limit || 10;
        const startIndex = (page - 1) * limit;
        const endIndex = page * limit;
        const paginatedCompanies = filteredCompanies.slice(startIndex, endIndex);

        return {
          companies: paginatedCompanies,
          total: filteredCompanies.length,
          page: page,
          limit: limit,
          totalPages: Math.ceil(filteredCompanies.length / limit)
        };
      }

      const response = await api.get('/companies/search', { params });
      return response.data;
    } catch (error) {
      console.error('Error searching companies:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get job categories
  getJobCategories: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getJobCategories');

        // Mock job categories
        const categories = [
          { id: 'software-development', name: 'Software Development' },
          { id: 'design', name: 'Design' },
          { id: 'marketing', name: 'Marketing' },
          { id: 'sales', name: 'Sales' },
          { id: 'customer-service', name: 'Customer Service' },
          { id: 'finance', name: 'Finance' },
          { id: 'human-resources', name: 'Human Resources' },
          { id: 'product-management', name: 'Product Management' },
          { id: 'data-science', name: 'Data Science' },
          { id: 'engineering', name: 'Engineering' }
        ];

        return categories;
      }

      const response = await api.get('/jobs/categories');
      return response.data;
    } catch (error) {
      console.error('Error fetching job categories:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  },

  // Get industry types
  getIndustryTypes: async () => {
    try {
      if (USE_MOCK_DATA) {
        console.log('Using mock data for getIndustryTypes');

        // Mock industry types
        const industries = [
          { id: 'technology', name: 'Technology' },
          { id: 'finance', name: 'Finance' },
          { id: 'healthcare', name: 'Healthcare' },
          { id: 'education', name: 'Education' },
          { id: 'retail', name: 'Retail' },
          { id: 'manufacturing', name: 'Manufacturing' },
          { id: 'media', name: 'Media & Entertainment' },
          { id: 'hospitality', name: 'Hospitality & Tourism' },
          { id: 'transportation', name: 'Transportation & Logistics' },
          { id: 'energy', name: 'Energy & Utilities' }
        ];

        return industries;
      }

      const response = await api.get('/companies/industries');
      return response.data;
    } catch (error) {
      console.error('Error fetching industry types:', error);
      throw error.response ? error.response.data : new Error('Network error');
    }
  }
};

export default SearchService;
