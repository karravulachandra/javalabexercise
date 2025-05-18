package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.ApplicationsDAO;
import com.fjwp.jobportalsys.entity.Applications;
import com.fjwp.jobportalsys.entity.Companies;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import jakarta.transaction.Transactional;
import java.util.List;
import org.hibernate.Transaction;
@Transactional
public class ApplicationsDAOImpl implements ApplicationsDAO {
	 private SessionFactory sessionFactory;

	    public ApplicationsDAOImpl(SessionFactory sessionFactory) {
	        this.sessionFactory = sessionFactory;
	    }

	    @Override
	    public void addApplication(Applications application) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            session.persist(application);
	            transaction.commit();
	        }
	    }

	    @Override
	    public Applications getApplicationById(int id) {
	        try (Session session = sessionFactory.openSession()) {
	            return session.get(Applications.class, id);
	        }
	    }

	    @Override
	    public void updateApplication(Applications application) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            session.merge(application);
	            transaction.commit();
	        }
	    }

	    @Override
	    public void deleteApplication(int id) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            Applications application = session.get(Applications.class, id);
	            if (application != null) {
	                session.remove(application);
	            }
	            transaction.commit();
	        }
	    }

	    @Override
	    public List<Applications> getAllApplications() {
	        Session session = sessionFactory.openSession();
	        List<Applications> ApplicationsList = session.createQuery("from Applications", Applications.class).list();
	        session.close();
	        return ApplicationsList;
	        }	    
}
