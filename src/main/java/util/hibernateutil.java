package util;
import java.util.Properties;

import org.hibernate.service.ServiceRegistry;


import com.fjwp.jobportalsys.entity.*;
import org.hibernate.boot.registry.StandardServiceRegistryBuilder;
import org.hibernate.*;
import org.hibernate.cfg.Configuration;
import org.hibernate.cfg.Environment;
public class hibernateutil {
	private static SessionFactory sf;

	public static SessionFactory getSessionFactory() {
		if (sf == null) {
			try {
				Configuration config = new Configuration();
				Properties prop = new Properties();
				prop.put(Environment.DRIVER, "com.mysql.cj.jdbc.Driver");
				prop.put(Environment.URL, "jdbc:mysql://localhost/fjwp");
				prop.put(Environment.USER, "root");
				prop.put(Environment.PASS, "sushma@vadla#276");
				prop.put(Environment.SHOW_SQL, "true");
				prop.put(Environment.HBM2DDL_AUTO, "update");
				config.setProperties(prop);

				config.addAnnotatedClass(UserTypes.class);
				config.addAnnotatedClass(Users.class);
				config.addAnnotatedClass(JobSeekers.class);
				config.addAnnotatedClass(JobProviders.class);
				config.addAnnotatedClass(Educations.class);
				config.addAnnotatedClass(Applications.class);
				config.addAnnotatedClass(Jobs.class);
				config.addAnnotatedClass(Companies.class);
				// config.addAnnotatedClass(CourseDetails.class);

				ServiceRegistry sr = new StandardServiceRegistryBuilder().applySettings(config.getProperties()).build();
				sf = config.buildSessionFactory(sr);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return sf;
	}

}
