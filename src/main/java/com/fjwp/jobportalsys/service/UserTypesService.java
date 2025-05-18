package com.fjwp.jobportalsys.service;
import com.fjwp.jobportalsys.entity.UserTypes;
import java.util.List;
public interface UserTypesService {
	 void addUserType(UserTypes userType);
	    UserTypes getUserTypeById(Long id);
	    List<UserTypes> getAllUserTypes();
	    void updateUserType(UserTypes userType);
	    void deleteUserType(Long id);
	    UserTypes getUserTypeByCategory(String category);
}
