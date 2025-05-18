package com.fjwp.jobportalsys.dao.impl;
import com.fjwp.jobportalsys.dao.CompaniesDAO;
import com.fjwp.jobportalsys.entity.Companies;
import com.fjwp.jobportalsys.entity.JobProviders;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import jakarta.transaction.Transactional;
import java.util.List;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
@Transactional
public class CompaniesDAOImpl implements CompaniesDAO {
	private SessionFactory sessionFactory;

    public  CompaniesDAOImpl(SessionFactory sessionFactory) {
        this.sessionFactory = sessionFactory;
    }

    @Override
    public void addCompany(Companies company) {
        try (Session session = sessionFactory.openSession()) {
            Transaction transaction = session.beginTransaction();
            session.persist(company);
            transaction.commit();
        }
    }

    @Override
    public Companies getCompanyById(int id) {
        try (Session session = sessionFactory.openSession()) {
            return session.get(Companies.class, id);
        }
    }

    @Override
    public void updateCompany(Companies company) {
        try (Session session = sessionFactory.openSession()) {
            Transaction transaction = session.beginTransaction();
            session.merge(company);
            transaction.commit();
        }
    }

    @Override
    public void deleteCompany(Long id) {
        try (Session session = sessionFactory.openSession()) {
            Transaction transaction = session.beginTransaction();
            Companies company = session.get(Companies.class, id);
            if (company != null) {
                session.remove(company);
            }
            transaction.commit();
        }
    }

    @Override
    public List<Companies> getAllCompanies() {
        Session session = sessionFactory.openSession();
        List<Companies> CompaniesList = session.createQuery("from Companies", Companies.class).list();
        session.close();
        return CompaniesList;
        }
    
    
}
