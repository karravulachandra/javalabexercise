package com.fjwp.jobportalsys.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class Educations {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="education_id")
    private int educationId;
	
	@NotNull(message = "Education level cannot be null")
	@Column(name= "education_level")
    private String educationLevel;//graduation or post graduation
	
	@NotNull(message = "Course type cannot be null")
	@Column(name="course_type")
    private String courseType; //BSc Btech MSc MCA MBA 
	
	@NotNull(message = "Course cannot be null")
    private String course;      //MSCs CSE Maths MCA HR
	
	@NotNull(message = "Institute cannot be null")
    private String institute;
	
	@NotNull(message = "Course cannot be null")
	@Column(name="passout_year")
    private int passOutYear;
	
	@NotNull(message = "Percentage cannot be null")
    @DecimalMin(value = "0.0", inclusive = true, message = "Percentage must be at least 0.0")
    @DecimalMax(value = "100.0", inclusive = true, message = "Percentage must be at most 100.0")
	private double percentage;
	
	
	@Column(name="project_titles")
	@Size(min = 1, max = 100, message = "Project title must be between 1 and 100 characters")
    private String projecttitles;
    
	
	
	@ManyToOne
	@JoinColumn(name="job_seeker_id")
	private JobSeekers jobSeeker;
	
	public Educations() {
		
	}

	public Educations(String educationLevel,String courseType,String course, String institute,int passOutYear,double percentage,String projecttitles,JobSeekers jobSeekers) {
		super();
		this.educationLevel = educationLevel;
		this.courseType = courseType;
		this.course = course;
		this.institute = institute;
		this.passOutYear = passOutYear;
		this.percentage = percentage;
		this.projecttitles = projecttitles;
		this.jobSeeker = jobSeekers;
	}

	public int getEducationId() {
		return educationId;
	}

	public void setEducationId(int educationId) {
		this.educationId = educationId;
	}

	public String getEducationLevel() {
		return educationLevel;
	}

	public void setEducationLevel(String educationLevel) {
		this.educationLevel = educationLevel;
	}

	public String getCourseType() {
		return courseType;
	}

	public void setCourseType(String courseType) {
		this.courseType = courseType;
	}

	public String getCourse() {
		return course;
	}

	public void setCourse(String course) {
		this.course = course;
	}

	public String getInstitute() {
		return institute;
	}

	public void setInstitute(String institute) {
		this.institute = institute;
	}

	public int getPassOutYear() {
		return passOutYear;
	}

	public void setPassOutYear(int passOutYear) {
		this.passOutYear = passOutYear;
	}

	public double getPercentage() {
		return percentage;
	}

	public void setPercentage(double percentage) {
		this.percentage = percentage;
	}

	public String getProjecttitles() {
		return projecttitles;
	}

	public void setProjecttitles(String projecttitles) {
		this.projecttitles = projecttitles;
	}

	public JobSeekers getJobSeekers() {
		return jobSeeker;
	}

	public void setJobSeekers(JobSeekers jobSeekers) {
		this.jobSeeker = jobSeekers;
	}
    
}
