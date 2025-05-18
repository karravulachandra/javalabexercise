package com.fjwp.jobportalsys.dao;
import com.fjwp.jobportalsys.entity.Applications;
import java.util.List;
public interface ApplicationsDAO {
	void addApplication(Applications application);          // Save method
    Applications getApplicationById(int id);                  // Retrieve by ID
    void updateApplication(Applications application);        // Update method
    void deleteApplication(int id);                          // Delete method
    List<Applications> getAllApplications();                  // Retrieve all
}
