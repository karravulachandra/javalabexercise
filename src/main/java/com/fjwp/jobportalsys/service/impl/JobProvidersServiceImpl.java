package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.JobProvidersDAO;
import com.fjwp.jobportalsys.entity.JobProviders;
import java.util.List;
import com.fjwp.jobportalsys.service.*;
public class JobProvidersServiceImpl implements JobProvidersService {
	 private JobProvidersDAO jobProvidersDAO;

	    public JobProvidersServiceImpl(JobProvidersDAO jobProvidersDAO) {
	        this.jobProvidersDAO = jobProvidersDAO;
	    }

	    @Override
	    public void addJobProvider(JobProviders jobProvider) {
	        jobProvidersDAO.addJobProvider(jobProvider);
	    }

	    @Override
	    public JobProviders getJobProviderById(int id) {
	        return jobProvidersDAO.getJobProviderById(id);
	    }

	    @Override
	    public void updateJobProvider(JobProviders jobProvider) {
	        jobProvidersDAO.updateJobProvider(jobProvider);
	    }

	    @Override
	    public void deleteJobProvider(int id) {
	        jobProvidersDAO.deleteJobProvider(id);
	    }

	    @Override
	    public List<JobProviders> getAllJobProviders() {
	        return jobProvidersDAO.getAllJobProviders();
	    }
	    @Override
	    public JobProviders getJobProviderByUserId(int userId) {
	        return jobProvidersDAO.getJobProviderByUserId(userId);
	    }
}
