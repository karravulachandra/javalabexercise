package com.fjwp.jobportalsys.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Jobs {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "job_id")
	    private Long jobId;

	    @Column(name = "title", nullable = false, length = 100)
	    @NotBlank(message = "Title cannot be blank")
	    private String title;

	    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
	    @NotBlank(message = "Description cannot be blank")
	    private String description;

	    @Column(name = "location", nullable = false, length = 100)
	    @NotBlank(message = "Location cannot be blank")
	    private String location;

	    @Column(name = "posted_at", nullable = false)
	    @NotNull(message = "Posted date cannot be null")
	    private LocalDateTime postedAt;

	    @Column(name = "qualification", nullable = false, length = 50)
	    @NotBlank(message = "Qualification cannot be blank")
	    private String qualification;

	    @Column(name = "salary", nullable = false, precision = 15, scale = 2)
	    @NotNull(message = "Salary cannot be null")
	    private BigDecimal salary;

	    @Column(name = "job_type", nullable = false)
	    @NotNull(message = "Job type cannot be null")
	    private String jobType;
	   
	    
	    @OneToMany(mappedBy = "job",cascade = CascadeType.ALL)
		private Set<Applications> application1 = new HashSet<>();
	    
	    
        @ManyToOne
        @JoinColumn(name="job_provider_id")
        private JobProviders jobProvidersJobs ;
	    
	   
	    @ManyToOne
	    @JoinColumn(name="company_id")
	    private Companies companies;
	    
	    public Jobs() {
	    	
	    }

		public Jobs(String title,
				String description,
		        String location,
			    LocalDateTime postedAt,
				String qualification,
			    BigDecimal salary,
			    String jobType, Set<Applications> application1,
				JobProviders jobProvidersJobs, Companies companies) {
			super();
			this.title = title;
			this.description = description;
			this.location = location;
			this.postedAt = postedAt;
			this.qualification = qualification;
			this.salary = salary;
			this.jobType = jobType;
			this.application1 = application1;
			this.jobProvidersJobs = jobProvidersJobs;
			this.companies = companies;
		}

		public Long getJobId() {
			return jobId;
		}

		public void setJobId(Long jobId) {
			this.jobId = jobId;
		}

		public String getTitle() {
			return title;
		}

		public void setTitle(String title) {
			this.title = title;
		}

		public String getDescription() {
			return description;
		}

		public void setDescription(String description) {
			this.description = description;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public LocalDateTime getPostedAt() {
			return postedAt;
		}

		public void setPostedAt(LocalDateTime postedAt) {
			this.postedAt = postedAt;
		}

		public String getQualification() {
			return qualification;
		}

		public void setQualification(String qualification) {
			this.qualification = qualification;
		}

		public BigDecimal getSalary() {
			return salary;
		}

		public void setSalary(BigDecimal salary) {
			this.salary = salary;
		}

		public String getJobType() {
			return jobType;
		}

		public void setJobType(String jobType) {
			this.jobType = jobType;
		}

		public Set<Applications> getApplication1() {
			return application1;
		}

		public void setApplication1(Set<Applications> application1) {
			this.application1 = application1;
		}

		public JobProviders getJobProvidersJobs() {
			return jobProvidersJobs;
		}

		public void setJobProvidersJobs(JobProviders jobProvidersJobs) {
			this.jobProvidersJobs = jobProvidersJobs;
		}

		public Companies getCompanies() {
			return companies;
		}

		public void setCompanies(Companies companies) {
			this.companies = companies;
		}
	    
	    
           
}
