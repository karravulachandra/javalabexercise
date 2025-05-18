package com.fjwp.jobportalsys.dao.impl;

import com.fjwp.jobportalsys.dao.UserTypesDAO;
import com.fjwp.jobportalsys.entity.UserTypes;
import org.hibernate.Session;
import org.hibernate.SessionFactory;

import org.hibernate.Transaction;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.cfg.Configuration;
import org.hibernate.service.ServiceRegistry;
import java.util.List;
import org.hibernate.query.Query;

public class UserTypesDAOImpl implements UserTypesDAO {
	private SessionFactory sessionFactory;

    public UserTypesDAOImpl() {
        sessionFactory = new Configuration().configure("hibernate.cfg.xml").buildSessionFactory();
    }

    @Override
    public void addUserType(UserTypes userType) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.persist(userType);
        transaction.commit();
        session.close();
    }

    @Override
    public UserTypes getUserTypeById(Long id) {
        Session session = sessionFactory.openSession();
        UserTypes userType = session.get(UserTypes.class, id);
        session.close();
        return userType;
    }

    @Override
    public List<UserTypes> getAllUserTypes() {
        Session session = sessionFactory.openSession();
        List<UserTypes> userTypesList = session.createQuery("from UserTypes", UserTypes.class).list();
        session.close();
        return userTypesList;
    }

    @Override
    public void updateUserType(UserTypes userType) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        session.merge(userType);
        transaction.commit();
        session.close();
    }

    @Override
    public void deleteUserType(Long id) {
        Session session = sessionFactory.openSession();
        Transaction transaction = session.beginTransaction();
        UserTypes userType = session.get(UserTypes.class, id);
        if (userType != null) {
            session.remove(userType);
        }
        transaction.commit();
        session.close();
    }
    
    @Override
    public UserTypes getUserTypeByCategory(String category) {
        Transaction transaction = null;
        try (Session session = sessionFactory.openSession()) {
            transaction = session.beginTransaction();
            Query<UserTypes> query = session.createQuery("FROM UserTypes WHERE category = :category", UserTypes.class);
            query.setParameter("category", category);
            UserTypes userType = query.uniqueResult();
            transaction.commit();
            return userType;
        } catch (Exception e) {
            if (transaction != null) {
                transaction.rollback();
            }
            throw e;
        }
    }
}
