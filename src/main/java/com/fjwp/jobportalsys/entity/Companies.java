package com.fjwp.jobportalsys.entity;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Entity
public class Companies {
	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "company_id")
	    private Long companyId;

	   
	    @NotBlank(message = "Name cannot be blank")
	    private String name;

	    
	    @NotBlank(message = "Location cannot be blank")
	    private String location;

	    
	    @NotBlank(message = "Sector cannot be blank")
	    private String sector;

	   
	    @NotBlank(message = "Industry cannot be blank")
	    private String industry;

	    
	    @NotNull(message = "Founded date cannot be null")
	    private LocalDate founded;

	    @Column(name = "revenue", nullable = false, precision = 15, scale = 2)
	    @NotNull(message = "Revenue cannot be null")
	    private BigDecimal revenue;
	    
	 // One company can have many job providers
	    @OneToMany(mappedBy = "company", cascade = CascadeType.ALL)
	    private Set<JobProviders> jobProvider1 = new HashSet<>();
	    
	    @OneToMany(mappedBy = "companies",cascade = CascadeType.ALL)
		private Set<Jobs> jobsCompanies = new HashSet<>();
	    
	    public Companies() {
	    	
	    }

		public Companies(String name, String location,String sector,String industry, LocalDate founded, BigDecimal revenue, Set<JobProviders> jobProvider1,
				Set<Jobs> jobsCompanies) {
			super();
			this.name = name;
			this.location = location;
			this.sector = sector;
			this.industry = industry;
			this.founded = founded;
			this.revenue = revenue;
			this.jobProvider1 = jobProvider1;
			this.jobsCompanies = jobsCompanies;
		}

		public Long getCompanyId() {
			return companyId;
		}

		public void setCompanyId(Long companyId) {
			this.companyId = companyId;
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public String getLocation() {
			return location;
		}

		public void setLocation(String location) {
			this.location = location;
		}

		public String getSector() {
			return sector;
		}

		public void setSector(String sector) {
			this.sector = sector;
		}

		public String getIndustry() {
			return industry;
		}

		public void setIndustry(String industry) {
			this.industry = industry;
		}

		public LocalDate getFounded() {
			return founded;
		}

		public void setFounded(LocalDate founded) {
			this.founded = founded;
		}

		public BigDecimal getRevenue() {
			return revenue;
		}

		public void setRevenue(BigDecimal revenue) {
			this.revenue = revenue;
		}

		public Set<JobProviders> getJobProvider1() {
			return jobProvider1;
		}

		public void setJobProvider1(Set<JobProviders> jobProvider1) {
			this.jobProvider1 = jobProvider1;
		}

		public Set<Jobs> getJobsCompanies() {
			return jobsCompanies;
		}

		public void setJobsCompanies(Set<Jobs> jobsCompanies) {
			this.jobsCompanies = jobsCompanies;
		}
		
	    

}
