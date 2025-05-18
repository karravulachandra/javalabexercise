package com.fjwp.jobportalsys.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
public class JobSeekers {
	    @Id
	    @GeneratedValue (strategy = GenerationType.IDENTITY)
	    @Column(name="job_seeker_id")
	    private int jobSeekerId;
	    @Column(name = "accomplishments", columnDefinition = "TEXT")
	    private String accomplishments;
	    
	    
	    @OneToOne
	    @JoinColumn(name="user_id")
	    private Users user;
	    
	   
	    
	    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
	    private Set<Educations> education = new HashSet<>(); // Change to Set or List
	    
	    @OneToMany(mappedBy = "jobSeeker", cascade = CascadeType.ALL)
	    private Set<Applications> applications = new HashSet<>();
	    
	    public JobSeekers() {
	    	
	    }

		public JobSeekers(String accomplishments, Users user, Set<Educations> education, Set<Applications> applications) {
			super();
			this.accomplishments = accomplishments;
			this.user = user;
			this.education = education;
			this.applications = applications;
		}

		public int getJobSeekerId() {
			return jobSeekerId;
		}

		public void setJobSeekerId(int jobSeekerId) {
			this.jobSeekerId = jobSeekerId;
		}

		public String getAccomplishments() {
			return accomplishments;
		}

		public void setAccomplishments(String accomplishments) {
			this.accomplishments = accomplishments;
		}

		public Users getUser() {
			return user;
		}

		public void setUser(Users user) {
			this.user = user;
		}

		public Set<Educations> getEducation() {
			return education;
		}

		public void setEducation(Set<Educations> education) {
			this.education = education;
		}

		public Set<Applications> getApplications() {
			return applications;
		}

		public void setApplications(Set<Applications> applications) {
			this.applications = applications;
		}

		
}
