package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.UserTypesDAO;
import com.fjwp.jobportalsys.dao.impl.UserTypesDAOImpl;
import com.fjwp.jobportalsys.entity.UserTypes;
import com.fjwp.jobportalsys.service.UserTypesService;

import java.util.List;
public class UserTypesServiceImpl implements UserTypesService {
	 private UserTypesDAO userTypesDAO;

	    public UserTypesServiceImpl(UserTypesDAO userTypesDAO) {
	        this.userTypesDAO = userTypesDAO;
	    }

	    @Override
	    public void addUserType(UserTypes userType) {
	        userTypesDAO.addUserType(userType);
	    }

	    @Override
	    public UserTypes getUserTypeById(Long id) {
	        return userTypesDAO.getUserTypeById(id);
	    }

	    @Override
	    public List<UserTypes> getAllUserTypes() {
	        return userTypesDAO.getAllUserTypes();
	    }

	    @Override
	    public void updateUserType(UserTypes userType) {
	        userTypesDAO.updateUserType(userType);
	    }

	    @Override
	    public void deleteUserType(Long id) {
	        userTypesDAO.deleteUserType(id);
	    }
	    
	    @Override
	    public UserTypes getUserTypeByCategory(String category) {
	        return userTypesDAO.getUserTypeByCategory(category);
	    }
}
