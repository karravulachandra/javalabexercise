package com.fjwp.jobportalsys.dao;

import com.fjwp.jobportalsys.entity.UserTypes;
import java.util.List;

public interface UserTypesDAO {
	void addUserType(UserTypes userType);
    UserTypes getUserTypeById(Long id);
    List<UserTypes> getAllUserTypes();
    void updateUserType(UserTypes userType);
    void deleteUserType(Long id);
    UserTypes getUserTypeByCategory(String category);
}
