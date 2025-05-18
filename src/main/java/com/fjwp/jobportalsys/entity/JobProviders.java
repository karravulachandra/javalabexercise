package com.fjwp.jobportalsys.entity;

import jakarta.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*; 
@Entity
public class JobProviders {
	        @Id
	        @GeneratedValue(strategy = GenerationType.IDENTITY)
	        @Column(name="job_provider_id")
            private int jobProviderId;
	        @NotNull(message = "Designation cannot be null")
            private String designation;
	        
	        
		    @OneToOne
		    @JoinColumn(name="user_id")
		    private Users user1;
	/*	 // Job provider has one user (mappedBy on Users entity)
		    @OneToOne
		    @JoinColumn(name = "user_id", nullable = false)
		    private Users user;*/
	        
		    // Job provider works for one company
		    @ManyToOne
		    @JoinColumn(name = "company_id", nullable = false)
		    private Companies company;
	        
	        @OneToMany(mappedBy = "jobProvidersJobs",cascade = CascadeType.ALL)
			private Set<Jobs> jobs = new HashSet<>();
	        
	        public JobProviders() {
		    	
		    }

			public JobProviders(String designation, Users user1,
					Companies company, Set<Jobs> jobs) {
				super();
				this.designation = designation;
				this.user1 = user1;
				this.company = company;
				this.jobs = jobs;
			}

			public int getJobProviderId() {
				return jobProviderId;
			}

			public void setJobProviderId(int jobProviderId) {
				this.jobProviderId = jobProviderId;
			}

			public String getDesignation() {
				return designation;
			}

			public void setDesignation(String designation) {
				this.designation = designation;
			}

			public Users getUser1() {
				return user1;
			}

			public void setUser1(Users user1) {
				this.user1 = user1;
			}

			public Companies getCompany() {
				return company;
			}

			public void setCompany(Companies company) {
				this.company = company;
			}

			public Set<Jobs> getJobs() {
				return jobs;
			}

			public void setJobs(Set<Jobs> jobs) {
				this.jobs = jobs;
			}
	        
}
