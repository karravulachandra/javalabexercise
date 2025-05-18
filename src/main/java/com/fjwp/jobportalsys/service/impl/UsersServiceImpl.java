package com.fjwp.jobportalsys.service.impl;
import com.fjwp.jobportalsys.dao.UsersDAO;
import com.fjwp.jobportalsys.entity.Users;
import com.fjwp.jobportalsys.service.UsersService;
import java.util.List;
public class UsersServiceImpl implements UsersService {
	private UsersDAO usersDAO;

    public UsersServiceImpl(UsersDAO usersDAO) {
        this.usersDAO = usersDAO;
    }

    @Override
    public void addUser(Users user) {
        usersDAO.addUser(user);
    }

    @Override
    public Users getUserById(int id) {
        return usersDAO.getUserById(id);
    }

    @Override
    public void updateUser(Users user) {
        usersDAO.updateUser(user);
    }

    @Override
    public void deleteUser(int id) {
        usersDAO.deleteUser(id);
    }

    @Override
    public List<Users> getAllUsers() {
        return usersDAO.getAllUsers();
    }
}
