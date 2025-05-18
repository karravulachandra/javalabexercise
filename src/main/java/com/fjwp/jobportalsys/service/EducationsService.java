package com.fjwp.jobportalsys.service;
import com.fjwp.jobportalsys.entity.Educations;
import java.util.List;
public interface EducationsService {
	void addEducation(Educations education);          // Save method
    Educations getEducationById(int id);               // Retrieve by ID
    void updateEducation(Educations education);       // Update method
    void deleteEducation(int id);                     // Delete method
    List<Educations> getAllEducations();               // Retrieve all
}
