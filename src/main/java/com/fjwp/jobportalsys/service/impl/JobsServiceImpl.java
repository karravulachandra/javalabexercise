package com.fjwp.jobportalsys.service.impl;


import com.fjwp.jobportalsys.dao.JobsDAO;
import com.fjwp.jobportalsys.entity.Jobs;
import java.util.List;
import com.fjwp.jobportalsys.service.*;
public class JobsServiceImpl implements JobsService {
	
	private  JobsDAO jobsDao;

    public JobsServiceImpl(JobsDAO jobsDao) {
        this.jobsDao = jobsDao;
    }
	
	   

	    @Override
	    public void addJob(Jobs job) {
	        jobsDao.addJob(job);
	    }

	    @Override
	    public Jobs getJobById(int jobId) {
	        return jobsDao.getJobById(jobId);
	    }

	    @Override
	    public void updateJob(Jobs job) {
	        jobsDao.updateJob(job);
	    }

	    @Override
	    public void deleteJob(Long id) {
	        jobsDao.deleteJob(id);
	    }

	    @Override
	    public List<Jobs> getAllJobs() {
	        return jobsDao.getAllJobs();
	    }
}
