package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.EducationsDAO;

import com.fjwp.jobportalsys.entity.Educations;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import jakarta.transaction.Transactional;
import java.util.List;
import org.hibernate.Transaction;
@Transactional
public class EducationsDAOImpl implements EducationsDAO {
	 private SessionFactory sessionFactory;

	    public EducationsDAOImpl(SessionFactory sessionFactory) {
	        this.sessionFactory = sessionFactory;
	    }

	    @Override
	    public void addEducation(Educations education) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            session.persist(education);
	            transaction.commit();
	        }
	    }

	    @Override
	    public Educations getEducationById(int id) {
	        try (Session session = sessionFactory.openSession()) {
	            return session.get(Educations.class, id);
	        }
	    }

	    @Override
	    public void updateEducation(Educations education) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            session.merge(education);
	            transaction.commit();
	        }
	    }

	    @Override
	    public void deleteEducation(int id) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            Educations education = session.get(Educations.class, id);
	            if (education != null) {
	                session.remove(education);
	            }
	            transaction.commit();
	        }
	    }

	    @Override
	    public List<Educations> getAllEducations() {
	        Session session = sessionFactory.openSession();
	        List<Educations> EducationsList = session.createQuery("from Educations", Educations.class).list();
	        session.close();
	        return EducationsList;
	        
	        }
	    
}
