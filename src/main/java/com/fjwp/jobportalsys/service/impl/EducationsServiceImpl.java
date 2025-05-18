package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.EducationsDAO;
import com.fjwp.jobportalsys.entity.Educations;
import com.fjwp.jobportalsys.service.*;
import java.util.List;
public class EducationsServiceImpl implements EducationsService {
	 private EducationsDAO educationsDao;

	    public EducationsServiceImpl(EducationsDAO educationsDao) {
	        this.educationsDao = educationsDao;
	    }

	    @Override
	    public void addEducation(Educations education) {
	        educationsDao.addEducation(education);
	    }

	    @Override
	    public Educations getEducationById(int id) {
	        return educationsDao.getEducationById(id);
	    }

	    @Override
	    public void updateEducation(Educations education) {
	        educationsDao.updateEducation(education);
	    }

	    @Override
	    public void deleteEducation(int id) {
	        educationsDao.deleteEducation(id);
	    }

	    @Override
	    public List<Educations> getAllEducations() {
	        return educationsDao.getAllEducations();
	    }
}
