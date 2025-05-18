package com.fjwp.jobportalsys.service;
import com.fjwp.jobportalsys.entity.Users;
import java.util.List;
public interface UsersService {
	 void addUser(Users user);
	    Users getUserById(int id);
	    void updateUser(Users user);
	    void deleteUser(int id);
	    List<Users> getAllUsers();
}
