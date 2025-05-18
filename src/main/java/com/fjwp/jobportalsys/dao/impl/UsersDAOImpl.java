package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.UsersDAO;
import com.fjwp.jobportalsys.entity.Users;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.hibernate.Transaction;
import java.util.List;


public class UsersDAOImpl implements UsersDAO {
	private SessionFactory sessionFactory;

    public UsersDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addUser(Users user) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.persist(user);
        transaction.commit();
        session.close();
    }

    @Override
    public Users getUserById(int id) {
        Session session = sessionFactory.openSession();
        Users user = session.get(Users.class, id);
        session.close();
        return user;
    }

    @Override
    public void updateUser(Users user) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.merge(user);  // Use merge() to handle detached entity cases
        transaction.commit();
        session.close();
    }

    @Override
    public void deleteUser(int id) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        Users user = session.get(Users.class, id);
        if (user != null) {
            session.remove(user);
        }
        transaction.commit();
        session.close();
    }

    @Override
    public List<Users> getAllUsers() {
        Session session = sessionFactory.openSession();
        List<Users> usersList = session.createQuery("from Users", Users.class).list();
        session.close();
        return usersList;
    }
}
