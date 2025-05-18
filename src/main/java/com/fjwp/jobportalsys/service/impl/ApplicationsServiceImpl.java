package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.ApplicationsDAO;
import com.fjwp.jobportalsys.entity.Applications;
import java.util.List;
import com.fjwp.jobportalsys.service.*;
public class ApplicationsServiceImpl implements ApplicationsService{
	private ApplicationsDAO applicationsDao;

    public ApplicationsServiceImpl(ApplicationsDAO applicationsDao) {
        this.applicationsDao = applicationsDao;
    }

    @Override
    public void addApplication(Applications application) {
        applicationsDao.addApplication(application);
    }

    @Override
    public Applications getApplicationById(int id) {
        return applicationsDao.getApplicationById(id);
    }

    @Override
    public void updateApplication(Applications application) {
        applicationsDao.updateApplication(application);
    }

    @Override
    public void deleteApplication(int id) {
        applicationsDao.deleteApplication(id);
    }

    @Override
    public List<Applications> getAllApplications() {
        return applicationsDao.getAllApplications();
    }
}
