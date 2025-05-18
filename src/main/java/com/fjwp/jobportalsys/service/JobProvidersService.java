package com.fjwp.jobportalsys.service;
import com.fjwp.jobportalsys.entity.JobProviders;
import java.util.List;
public interface JobProvidersService {
	void addJobProvider(JobProviders jobProvider);     // Save method
    JobProviders getJobProviderById(int id);           // Retrieve by ID
    void updateJobProvider(JobProviders jobProvider);  // Update method
    void deleteJobProvider(int id);                    // Delete method
    List<JobProviders> getAllJobProviders();           // List all job providers
    JobProviders getJobProviderByUserId(int userId);
}
