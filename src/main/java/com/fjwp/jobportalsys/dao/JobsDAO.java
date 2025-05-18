package com.fjwp.jobportalsys.dao;
import com.fjwp.jobportalsys.entity.Jobs;
import java.util.List;
public interface JobsDAO {
	 void addJob(Jobs job);                // Save method
	    Jobs getJobById(int jobId);             // Retrieve by ID
	    void updateJob(Jobs job);            // Update method
	    void deleteJob(Long id);             // Delete method
	    List<Jobs> getAllJobs();             // Retrieve all
}
