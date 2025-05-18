package com.fjwp.jobportalsys.service;
import com.fjwp.jobportalsys.entity.JobSeekers;
import java.util.List;
public interface JobSeekersService {
	void addJobSeeker(JobSeekers jobSeeker);      // Save method
    JobSeekers getJobSeekerById(int id);          // Retrieve by ID
    void updateJobSeeker(JobSeekers jobSeeker);   // Update method
    void deleteJobSeeker(int jobSeekerId);                 // Delete method
    List<JobSeekers> getAllJobSeekers();          // List all job seekers
    JobSeekers getJobSeekerByUserId(int userId);
}
