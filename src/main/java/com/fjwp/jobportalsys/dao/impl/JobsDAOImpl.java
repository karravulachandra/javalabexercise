package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.JobsDAO;
import com.fjwp.jobportalsys.entity.Companies;
import com.fjwp.jobportalsys.entity.Jobs;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import jakarta.transaction.Transactional;
import java.util.List;
import org.hibernate.Transaction;
@Transactional
public class JobsDAOImpl implements JobsDAO {
	private SessionFactory sessionFactory;

    public JobsDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addJob(Jobs job) {
        try (Session session = sessionFactory.openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(job);
            transaction.commit();
        }
    }

    @Override
    public Jobs getJobById(int  jobId) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Jobs.class, jobId);
        }
    }

    @Override
    public void updateJob(Jobs job) {
        try (Session session = sessionFactory.openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(job);
            transaction.commit();
        }
    }

    @Override
    public void deleteJob(Long id) {
        try (Session session = sessionFactory.openSession()) {
            Transaction transaction = session.beginTransaction();
            Jobs job = session.get(Jobs.class, id);
            if (job != null) {
                session.remove(job);
            }
            transaction.commit();
        }
    }

    @Override
    public List<Jobs> getAllJobs() {
        Session session = sessionFactory.openSession();
        List<Jobs> JobsList = session.createQuery("from Jobs", Jobs.class).list();
        session.close();
        return JobsList; 
        }
    
}
