package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.CompaniesDAO;

import com.fjwp.jobportalsys.entity.Companies;
import java.util.List;
import com.fjwp.jobportalsys.service.*;
public class CompaniesServiceImpl implements CompaniesService {
	private CompaniesDAO companiesDao;

    public CompaniesServiceImpl(CompaniesDAO companiesDao) {
        this.companiesDao = companiesDao;
    }

    @Override
    public void addCompany(Companies company) {
        companiesDao.addCompany(company);
    }

    @Override
    public Companies getCompanyById(int id) {
        return companiesDao.getCompanyById(id);
    }

    @Override
    public void updateCompany(Companies company) {
        companiesDao.updateCompany(company);
    }

    @Override
    public void deleteCompany(Long id) {
        companiesDao.deleteCompany(id);
    }

    @Override
    public List<Companies> getAllCompanies() {
        return companiesDao.getAllCompanies();
    }
}
