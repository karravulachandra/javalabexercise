package com.fjwp.jobportalsys.dao;
import com.fjwp.jobportalsys.entity.Users;
import java.util.List;
public interface UsersDAO {
	void addUser(Users user);
    Users getUserById(int id);
    void updateUser(Users user);
    void deleteUser(int id);
    List<Users> getAllUsers();
}
