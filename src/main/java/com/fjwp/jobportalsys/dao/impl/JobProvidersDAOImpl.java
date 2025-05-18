package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.JobProvidersDAO;
import com.fjwp.jobportalsys.entity.JobProviders;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import jakarta.transaction.Transactional;
import java.util.List;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
@Transactional
public class JobProvidersDAOImpl implements JobProvidersDAO {
	 private SessionFactory sessionFactory;

	    public JobProvidersDAOImpl(SessionFactory sessionFactory) {
	        this.sessionFactory = sessionFactory;
	    }

	    @Override
	    public void addJobProvider(JobProviders jobProvider) {
	        Session session = sessionFactory.openSession();
	        Transaction transaction = session.beginTransaction();
	        session.persist(jobProvider);
	        transaction.commit();
	        session.close();
	    }

	    @Override
	    public JobProviders getJobProviderById(int id) {
	        Session session = sessionFactory.openSession();
	        JobProviders jobProvider = session.get(JobProviders.class, id);
	        session.close();
	        return jobProvider;
	    }

	    @Override
	    public void updateJobProvider(JobProviders jobProvider) {
	        Session session = sessionFactory.openSession();
	        Transaction transaction = session.beginTransaction();
	        session.merge(jobProvider);  // Use merge for updates
	        transaction.commit();
	        session.close();
	    }

	    @Override
	    public void deleteJobProvider(int id) {
	        Session session = sessionFactory.openSession();
	        Transaction transaction = session.beginTransaction();
	        JobProviders jobProvider = session.get(JobProviders.class, id);
	        if (jobProvider != null) {
	            session.remove(jobProvider);
	        }
	        transaction.commit();
	        session.close();
	    }

	    @Override
	    public List<JobProviders> getAllJobProviders() {
	        Session session = sessionFactory.openSession();
	        List<JobProviders> jobProvidersList = session.createQuery("from JobProviders", JobProviders.class).list();
	        session.close();
	        return jobProvidersList;
	    }
	    @Override
	    public JobProviders getJobProviderByUserId(int userId) {
	        Session session = null;
	        JobProviders jobProvider = null;
	        
	        try {
	            // Open session and begin transaction
	            session = sessionFactory.openSession();
	            session.beginTransaction();
	            
	            // Execute the query to get JobProvider by user ID
	            Query<JobProviders> query = session.createQuery("FROM JobProviders WHERE user1.userId = :userId", JobProviders.class);
	            query.setParameter("userId", userId);
	            jobProvider = query.uniqueResult(); // Returns null if not found

	            // Commit the transaction
	            session.getTransaction().commit();
	        } catch (Exception e) {
	            if (session != null && session.getTransaction() != null) {
	                session.getTransaction().rollback(); // Rollback transaction if there is an error
	            }
	            e.printStackTrace(); // Log the exception for debugging
	        } finally {
	            if (session != null) {
	                session.close(); // Always close the session to avoid memory leaks
	            }
	        }
	        
	        return jobProvider;
	    }
}
