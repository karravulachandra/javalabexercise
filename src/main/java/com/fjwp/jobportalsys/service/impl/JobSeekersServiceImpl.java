package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.JobSeekersDAO;
import com.fjwp.jobportalsys.entity.JobSeekers;
import com.fjwp.jobportalsys.service.*;
import java.util.List;
public class JobSeekersServiceImpl implements JobSeekersService {
	 private JobSeekersDAO jobSeekersDAO;

	    public JobSeekersServiceImpl(JobSeekersDAO jobSeekersDAO) {
	        this.jobSeekersDAO = jobSeekersDAO;
	    }

	    @Override
	    public void addJobSeeker(JobSeekers jobSeeker) {
	        jobSeekersDAO.addJobSeeker(jobSeeker);
	    }

	    @Override
	    public JobSeekers getJobSeekerById(int id) {
	        return jobSeekersDAO.getJobSeekerById(id);
	    }

	    @Override
	    public void updateJobSeeker(JobSeekers jobSeeker) {
	        jobSeekersDAO.updateJobSeeker(jobSeeker);
	    }

	    @Override
	    public void deleteJobSeeker(int id) {
	        jobSeekersDAO.deleteJobSeeker(id);
	    }

	    @Override
	    public List<JobSeekers> getAllJobSeekers() {
	        return jobSeekersDAO.getAllJobSeekers();
	    }
	    @Override
	    public JobSeekers getJobSeekerByUserId(int userId) {
	        return jobSeekersDAO.getJobSeekerByUserId(userId);
	    }
}
