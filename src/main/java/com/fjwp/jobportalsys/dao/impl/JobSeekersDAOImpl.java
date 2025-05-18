package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.JobSeekersDAO;
import com.fjwp.jobportalsys.entity.JobSeekers;
import com.fjwp.jobportalsys.entity.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import jakarta.transaction.Transactional;
import java.util.List;
import org.hibernate.Transaction;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
@Transactional
public class JobSeekersDAOImpl implements JobSeekersDAO {
	 private SessionFactory sessionFactory;

	    public JobSeekersDAOImpl(SessionFactory sessionFactory) {
	        this.sessionFactory = sessionFactory;
	    }

	    @Override
	    public void addJobSeeker(JobSeekers jobSeeker) {
	        Session session = sessionFactory.openSession();
	        Transaction transaction = session.beginTransaction();
	        session.persist(jobSeeker);
	        transaction.commit();
	        session.close();
	    }

	    @Override
	    public JobSeekers getJobSeekerById(int id) {
	        Session session = sessionFactory.openSession();
	        JobSeekers jobSeeker = session.get(JobSeekers.class, id);
	        session.close();
	        return jobSeeker;
	    }

	    @Override
	    public void updateJobSeeker(JobSeekers jobSeeker) {
	        Session session = sessionFactory.openSession();
	        Transaction transaction = session.beginTransaction();
	        session.merge(jobSeeker);  // Using merge for update
	        transaction.commit();
	        session.close();
	    }

	    @Override
	    public void deleteJobSeeker(int jobSeekerId) {
	        Session session = sessionFactory.openSession();
	        Transaction transaction = null;

	        try {
	            transaction = session.beginTransaction();
	            
	            // Delete related applications
	            Query<Applications> appQuery = session.createQuery("DELETE FROM Applications WHERE jobSeeker.jobSeekerId = :jobSeekerId");
	            appQuery.setParameter("jobSeekerId", jobSeekerId);
	            appQuery.executeUpdate();
	            
	            // Delete related educations
	            Query<Educations> eduQuery = session.createQuery("DELETE FROM Educations WHERE jobSeeker.jobSeekerId = :jobSeekerId");
	            eduQuery.setParameter("jobSeekerId", jobSeekerId);
	            eduQuery.executeUpdate();

	            // Now delete the job seeker
	            JobSeekers jobSeeker = session.get(JobSeekers.class, jobSeekerId);
	            if (jobSeeker != null) {
	                session.remove(jobSeeker);
	            }

	            transaction.commit();
	        } catch (Exception e) {
	            if (transaction != null) {
	                transaction.rollback();
	            }
	            e.printStackTrace();
	        } finally {
	            session.close();
	        }
	    }

	    @Override
	    public List<JobSeekers> getAllJobSeekers() {
	        Session session = sessionFactory.openSession();
	        List<JobSeekers> jobSeekersList = session.createQuery("from JobSeekers", JobSeekers.class).list();
	        session.close();
	        return jobSeekersList;
	    }
	    
	    @Override
	    public JobSeekers getJobSeekerByUserId(int userId) {
	        try (Session session = sessionFactory.openSession()) {
	            Transaction transaction = session.beginTransaction();
	            Query<JobSeekers> query = session.createQuery("FROM JobSeekers WHERE user.userId = :userId", JobSeekers.class);
	            query.setParameter("userId", userId);
	            JobSeekers jobSeeker = query.uniqueResult(); // Returns null if not found
	            transaction.commit();
	            return jobSeeker;
	        } catch (Exception e) {
	            // Handle the exception (optional: log it or rethrow)
	            e.printStackTrace();
	            return null; // or throw a custom exception if needed
	        }
	    }
	    
	    
}
