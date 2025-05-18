package com.fjwp.jobportalsys.entity;

import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.util.HashSet;
import java.util.Set;
import jakarta.persistence.*;

@Entity
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id")
	private int userId;

	@NotNull(message = "Firstname cannot be null")
	@Size(min = 3, max = 15, message = "Firstname must be between 3 and 15 characters")
	@Column(name = "first_name")
	private String firstName;

	// @NotNull(message = "lastName cannot be null")
	@Size(min = 3, max = 15, message = "Lastname must be between 3 and 15 characters")
	@Column(name = "last_name")
	private String lastName;

	@NotNull(message = "Email cannot be null")
	@Email(message = "Email must be valid and email must be unique")
	@Column(unique = true)
	
	private String email;

	@NotNull(message = "Password cannot be null")
	@Column(name = "password", nullable = false)
	@Size(min = 8, max = 100, message = "Password must be between 8 and 100 characters")
	@Pattern(regexp = "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@#$%^&+=]).*$", message = "Password must contain at least one number, one letter, and one special character")
	private String password;

	@NotNull(message = "Gender cannot be null")
	private String gender;

	@NotNull(message = "Date of birth cannot be null")
	@Past(message = "Date of birth must be in the past")
	@Column(name = "DOB")
	private LocalDate dob;

	@Column(name = "phone_number", length = 15, nullable = false)
	@NotNull(message = "Phone number cannot be null")
	@Size(min = 10, max = 15, message = "Phone number must be between 10 and 15 digits")
	@Pattern(regexp = "^\\+?[0-9]{10,15}$", message = "Invalid phone number format")
	private String phone;

	@NotNull(message = "Location cannot be null")
	private String location;
	
	
	@ManyToOne
    @JoinColumn(name = "user_type_id", nullable = false)
    private UserTypes userTypes;
	

	 
	@OneToOne(mappedBy = "user",cascade = CascadeType.ALL)
	private JobSeekers jobSeeker;
	
	@OneToOne(mappedBy = "user1",cascade = CascadeType.ALL)
	private JobProviders jobProvider;
	

	public Users() { // non parameterized constructor

	}


	public Users(
			String firstName,
			String lastName,
			String email,
			String password,
			String gender,
			LocalDate dob,
			String phone,
			String location, UserTypes userTypes, JobSeekers jobSeeker,
			JobProviders jobProvider) {
		super();
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.password = password;
		this.gender = gender;
		this.dob = dob;
		this.phone = phone;
		this.location = location;
		this.userTypes = userTypes;
		this.jobSeeker = jobSeeker;
		this.jobProvider = jobProvider;
	}


	public int getUserId() {
		return userId;
	}


	public void setUserId(int userId) {
		this.userId = userId;
	}


	public String getFirstName() {
		return firstName;
	}


	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}


	public String getLastName() {
		return lastName;
	}


	public void setLastName(String lastName) {
		this.lastName = lastName;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getGender() {
		return gender;
	}


	public void setGender(String gender) {
		this.gender = gender;
	}


	public LocalDate getDob() {
		return dob;
	}


	public void setDob(LocalDate dob) {
		this.dob = dob;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getLocation() {
		return location;
	}


	public void setLocation(String location) {
		this.location = location;
	}


	public UserTypes getUserTypes() {
		return userTypes;
	}


	public void setUserTypes(UserTypes userTypes) {
		this.userTypes = userTypes;
	}


	public JobSeekers getJobSeeker() {
		return jobSeeker;
	}


	public void setJobSeeker(JobSeekers jobSeeker) {
		this.jobSeeker = jobSeeker;
	}


	public JobProviders getJobProvider() {
		return jobProvider;
	}


	public void setJobProvider(JobProviders jobProvider) {
		this.jobProvider = jobProvider;
	}

	
}
