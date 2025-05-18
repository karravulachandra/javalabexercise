package com.fjwp.jobportalsys.entity;

import java.time.LocalDateTime;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
@Entity
public class Applications {
	    @Id
	   
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "application_id")
           private int applicationid;
	    
	    
	    @Column(name = "status")
	    @NotNull(message = "Status cannot be null")
	    private String status; // Stores the status of the application  (pending, accepted, rejected, interview scheduled)
     
           
           @Column(name = "resume_file_path")
           private String resumeFilePath;
           
           
           @Column(name = "applied_at")
           @NotNull(message = "Applied date cannot be null")
           private LocalDateTime appliedAt;
           
        
        @ManyToOne
        @JoinColumn(name = "job_seeker_id", nullable = false)
        private JobSeekers jobSeeker; 
        
        
       
        @ManyToOne
        @JoinColumn(name="job_id")
        private Jobs job;
        
        public Applications() {
        	
        }

		public Applications(String status, String resumeFilePath,
				 LocalDateTime appliedAt, JobSeekers jobSeeker,
				Jobs job) {
			super();
			this.status = status;
			this.resumeFilePath = resumeFilePath;
			this.appliedAt = appliedAt;
			this.jobSeeker = jobSeeker;
			this.job = job;
		}

		public int getApplicationid() {
			return applicationid;
		}

		public void setApplicationid(int applicationid) {
			this.applicationid = applicationid;
		}

		public String getStatus() {
			return status;
		}

		public void setStatus(String status) {
			this.status = status;
		}

		public String getResumeFilePath() {
			return resumeFilePath;
		}

		public void setResumeFilePath(String resumeFilePath) {
			this.resumeFilePath = resumeFilePath;
		}

		public LocalDateTime getAppliedAt() {
			return appliedAt;
		}

		public void setAppliedAt(LocalDateTime appliedAt) {
			this.appliedAt = appliedAt;
		}

		public JobSeekers getJobSeeker() {
			return jobSeeker;
		}

		public void setJobSeeker(JobSeekers jobSeeker) {
			this.jobSeeker = jobSeeker;
		}

		public Jobs getJob() {
			return job;
		}

		public void setJob(Jobs job) {
			this.job = job;
		}

		
}
