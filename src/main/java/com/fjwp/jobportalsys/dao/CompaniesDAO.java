package com.fjwp.jobportalsys.dao;
import com.fjwp.jobportalsys.entity.Companies;
import java.util.List;
public interface CompaniesDAO {
	void addCompany(Companies company);             // Save method
    Companies getCompanyById(int id);               // Retrieve by ID
    void updateCompany(Companies company);          // Update method
    void deleteCompany(Long id);                    // Delete method
    List<Companies> getAllCompanies();               // Retrieve all
}
