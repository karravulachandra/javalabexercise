package com.fjwp.jobportalsys;

import com.fjwp.jobportalsys.entity.*;
import com.fjwp.jobportalsys.dao.*;
import com.fjwp.jobportalsys.dao.impl.*;
import com.fjwp.jobportalsys.service.*;
import com.fjwp.jobportalsys.service.impl.*;
import java.util.*;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

import jakarta.validation.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.HashSet;
import java.util.Set;


public class App {
	public static void main(String[] args) {
		 
        Scanner scanner = new Scanner(System.in);

        // Admin credentials
        String adminUsername = "admin";
        String adminPassword = "psw123"; 

        // Admin login process
        System.out.println("Admin Login");
        System.out.print("Username: ");
        String usernameInput = scanner.nextLine();
        System.out.print("Password: ");
        String passwordInput = scanner.nextLine();

        // Validate credentials
        if (adminUsername.equals(usernameInput) && adminPassword.equals(passwordInput)) {
            System.out.println("Login successful!");
            
            
		//Load Hibernate configuration from hibernate.cfg.xml
		Configuration con = new Configuration();
		con.configure();
		SessionFactory sessionFactory = con.buildSessionFactory();
		
        
        
		/*try (Session session = sessionFactory.openSession()) {

            // Begin a new transaction
            session.beginTransaction();

            // Initialize DAO and Service
            UserTypesDAO userTypesDAO = new UserTypesDAOImpl();
            UserTypesService userTypesService = new UserTypesServiceImpl(userTypesDAO);

            boolean exit = false;
		    while (!exit) {
            System.out.println("Select an operation:");
            System.out.println("1. Add UserType");
            System.out.println("2. Fetch All UserTypes");
            System.out.println("3. Fetch UserType by ID");
            System.out.println("4. Update UserType");
            System.out.println("5. Delete UserType");

            int choice = scanner.nextInt();
            switch (choice) {
                case 1:
                    // Add UserType
                	 UserTypes newUserType = new UserTypes();
                	    System.out.println("Enter category (e.g., Job Provider or Job Seeker): ");
                	    scanner.nextLine(); // Consume the leftover newline from previous input (if any)
                	    String category = scanner.nextLine();  
                	    newUserType.setCategory(category);
                	    userTypesService.addUserType(newUserType);
                	    System.out.println("UserType added successfully.");
                	    break;

                case 2:
                    // Fetch All UserTypes
                    System.out.println("All User Types:");
                    for (UserTypes ut : userTypesService.getAllUserTypes()) {
                        System.out.println(ut.getCategory());
                    }
                    break;

                case 3:
                    // Fetch UserType by ID
                    System.out.println("Enter UserType ID: ");
                    long fetchId = scanner.nextLong();
                    UserTypes fetchedUserType = userTypesService.getUserTypeById(fetchId);
                    if (fetchedUserType != null) {
                        System.out.println("Fetched UserType: " + fetchedUserType.getCategory());
                    } else {
                        System.out.println("UserType not found.");
                    }
                    break;

                case 4:
                    // Update UserType
                	System.out.println("Enter UserType ID to update: ");
                	long updateId = scanner.nextLong();
                	scanner.nextLine();  

                	UserTypes userTypeToUpdate = userTypesService.getUserTypeById(updateId);
                	if (userTypeToUpdate != null) {
                	    System.out.println("Enter new category: ");
                	    String newCategory = scanner.nextLine();  
                	    userTypeToUpdate.setCategory(newCategory);
                	    userTypesService.updateUserType(userTypeToUpdate);
                	    System.out.println("UserType updated successfully.");
                	} else {
                	    System.out.println("UserType not found.");
                	}
                	break;

                case 5:
                    // Delete UserType
                    System.out.println("Enter UserType ID to delete: ");
                    long deleteId = scanner.nextLong();
                    UserTypes userTypeToDelete = userTypesService.getUserTypeById(deleteId);
                    if (userTypeToDelete != null) {
                        userTypesService.deleteUserType(userTypeToDelete.getUserTypeId());
                        System.out.println("UserType and associated users deleted successfully.");
                    } else {
                        System.out.println("UserType not found.");
                    }
                    break;
                 case 6:
		                // Exit
		                exit = true;
		                System.out.println("Exiting UserTypes Operations.");
		                break;
                default:
                    System.out.println("Invalid choice. Please try again.");
                    break;
            }
            }

            // Commit the transaction after the operations
            session.getTransaction().commit();
            System.out.println("Transaction committed successfully.");
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Ensure the session factory is closed when the program finishes
            sessionFactory.close();
        }
	    }*/
		
	
		/*try (Session session = sessionFactory.openSession()) {
		    
		    // Begin a new transaction
		    session.beginTransaction();
		    
		    UserTypesDAO userTypesDAO = new UserTypesDAOImpl();
		    UserTypesService userTypesService = new UserTypesServiceImpl(userTypesDAO);
		    
		    // Initialize DAO and Service for Users
		    UsersDAO usersDAO = new UsersDAOImpl(sessionFactory);
		    UsersService usersService = new UsersServiceImpl(usersDAO);

		    boolean exit = false;
		    while (!exit) {
		    System.out.println("Select an operation:");
		    System.out.println("1. Add User");
		    System.out.println("2. Fetch All Users");
		    System.out.println("3. Update User");
		    System.out.println("4. Delete User");

		    int choice = scanner.nextInt();
		    scanner.nextLine();  // Consume leftover newline

		    switch (choice) {
		        case 1:
		            // Add User
		            System.out.println("Enter UserType category (e.g., Job Seeker): ");
		            String category = scanner.nextLine();
		            UserTypes userType = userTypesService.getUserTypeByCategory(category);

		            // If UserType doesn't exist, create a new one
		            if (userType == null) {
		                userType = new UserTypes();
		                userType.setCategory(category);
		                userTypesService.addUserType(userType);
		            }

		            // Create a new User
		            Users newUser = new Users();
		            System.out.println("Enter first name: ");
		            newUser.setFirstName(scanner.nextLine());

		            System.out.println("Enter last name: ");
		            newUser.setLastName(scanner.nextLine());

		            System.out.println("Enter email: ");
		            newUser.setEmail(scanner.nextLine());

		            System.out.println("Enter password: ");
		            newUser.setPassword(scanner.nextLine());

		            System.out.println("Enter gender: ");
		            newUser.setGender(scanner.nextLine());

		            System.out.println("Enter date of birth (yyyy-MM-dd): ");
		            LocalDate dob = LocalDate.parse(scanner.nextLine());
		            newUser.setDob(dob);

		            System.out.println("Enter phone number: ");
		            newUser.setPhone(scanner.nextLine());

		            System.out.println("Enter location: ");
		            newUser.setLocation(scanner.nextLine());

		            newUser.setUserTypes(userType);  // Set the UserType
		            usersService.addUser(newUser);   // Add the user

		            System.out.println("User added successfully.");
		            break;

		        case 2:
		            // Fetch All Users
		            List<Users> usersList = usersService.getAllUsers();
		            System.out.println("All Users:");
		            for (Users user : usersList) {
		                System.out.println("User: " + user.getFirstName() + " " + user.getLastName());
		            }
		            break;

		        case 3:
		            // Update User
		            System.out.println("Enter User ID to update: ");
		            int userIdToUpdate = scanner.nextInt();
		            scanner.nextLine();  // Consume leftover newline

		            Users userToUpdate = usersService.getUserById(userIdToUpdate);
		            if (userToUpdate != null) {
		                System.out.println("User found: " + userToUpdate.getFirstName());

		                System.out.println("Enter new email: ");
		                userToUpdate.setEmail(scanner.nextLine());

		                System.out.println("Enter new phone number: ");
		                userToUpdate.setPhone(scanner.nextLine());

		                usersService.updateUser(userToUpdate);  // Save the updated user
		                System.out.println("User updated successfully.");
		            } else {
		                System.out.println("User with ID " + userIdToUpdate + " not found.");
		            }
		            break;

		        case 4:
		            // Delete User
		            System.out.println("Enter User ID to delete: ");
		            int userIdToDelete = scanner.nextInt();

		            usersService.deleteUser(userIdToDelete);
		            System.out.println("User deleted with ID: " + userIdToDelete);

		            // Display all users after deletion
		            usersList = usersService.getAllUsers();
		            System.out.println("Remaining Users:");
		            for (Users user : usersList) {
		                System.out.println("User: " + user.getFirstName() + " " + user.getLastName());
		            }
		            break;
                 
                  case 5:
		                // Exit
		                exit = true;
		                System.out.println("Exiting Users Operations.");
		                break;
                  
		        default:
		            System.out.println("Invalid choice. Please try again.");
		            break;
		    }
		    }

		    // Commit the transaction
		    session.getTransaction().commit();
		    System.out.println("Transaction committed successfully.");
		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		    // Ensure the session factory is closed
		    sessionFactory.close();
		}
				}*/
		/*try (Session session = sessionFactory.openSession()) {

    // Begin a new transaction
    session.beginTransaction();

    // Initialize DAO and Service for Job Seekers
    JobSeekersDAO jobSeekersDAO = new JobSeekersDAOImpl(sessionFactory);
    JobSeekersService jobSeekersService = new JobSeekersServiceImpl(jobSeekersDAO);

    // Initialize DAO and Service for Users
    UsersDAO usersDAO = new UsersDAOImpl(sessionFactory);
    UsersService usersService = new UsersServiceImpl(usersDAO);

    
    boolean exit = false;
		    while (!exit) {
    System.out.println("Select Job Seeker Operation:");
    System.out.println("1. Add or Update Job Seeker");
    System.out.println("2. Fetch Job Seeker by ID");
    System.out.println("3. Update Job Seeker Accomplishments");
    System.out.println("4. Delete Job Seeker");

    int choice = scanner.nextInt();
    scanner.nextLine();  // Consume leftover newline

    switch (choice) {
        case 1:
            // Add or Update Job Seeker
            System.out.println("Enter User ID associated with the Job Seeker: ");
            int userId = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            // Fetch existing user from UsersService
            Users existingUser = usersService.getUserById(userId);
            if (existingUser != null) {
                JobSeekers jobSeeker = jobSeekersService.getJobSeekerByUserId(existingUser.getUserId());

                if (jobSeeker == null) {
                    jobSeeker = new JobSeekers();
                }

                System.out.println("Enter accomplishments: ");
                String accomplishments = scanner.nextLine();
                jobSeeker.setAccomplishments(accomplishments);
                jobSeeker.setUser(existingUser);

                jobSeekersService.addJobSeeker(jobSeeker);
                System.out.println("Job Seeker added/updated successfully.");
            } else {
                System.out.println("User not found.");
            }
            break;

        case 2:
            // Fetch Job Seeker by ID
            System.out.println("Enter Job Seeker ID to fetch: ");
            int jobSeekerId = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            JobSeekers retrievedJobSeeker = jobSeekersService.getJobSeekerById(jobSeekerId);
            if (retrievedJobSeeker != null) {
                System.out.println("Job Seeker Accomplishments: " + retrievedJobSeeker.getAccomplishments());
            } else {
                System.out.println("Job Seeker not found.");
            }
            break;

        case 3:
            // Update Job Seeker Accomplishments
            System.out.println("Enter Job Seeker ID to update: ");
            int updateJobSeekerId = scanner.nextInt();
            scanner.nextLine();  // Consume newline

            JobSeekers jobSeekerToUpdate = jobSeekersService.getJobSeekerById(updateJobSeekerId);
            if (jobSeekerToUpdate != null) {
                System.out.println("Enter new accomplishments: ");
                String newAccomplishments = scanner.nextLine();
                jobSeekerToUpdate.setAccomplishments(newAccomplishments);

                jobSeekersService.updateJobSeeker(jobSeekerToUpdate);
                System.out.println("Accomplishments updated successfully.");
            } else {
                System.out.println("Job Seeker not found.");
            }
            break;

        case 4:
            // Delete Job Seeker
            System.out.println("Enter Job Seeker ID to delete: ");
            int deleteJobSeekerId = scanner.nextInt();

            jobSeekersService.deleteJobSeeker(deleteJobSeekerId);
            System.out.println("Job Seeker deleted successfully.");
            break;
          case 5:
		                // Exit
		                exit = true;
		                System.out.println("Exiting JobSeekers Operations.");
		                break;
                  
        default:
            System.out.println("Invalid choice. Please try again.");
            break;
    }
    }

    // Commit the transaction
    session.getTransaction().commit();
    System.out.println("Transaction committed successfully.");
    } catch (Exception e) {
    e.printStackTrace();
     } finally {
    // Ensure the session factory is closed
    sessionFactory.close();
    }
		}*/
		/* try (Session session = sessionFactory.openSession()) {
	            // Begin a single transaction for all operations
	            session.beginTransaction();

	            // Initialize DAOs and Services
	            CompaniesDAO companiesDao = new CompaniesDAOImpl(sessionFactory);
	            CompaniesService companiesService = new CompaniesServiceImpl(companiesDao);

	            
                boolean exit = false;
		        while (!exit) {
	            System.out.println("Select an operation:");
	            System.out.println("1: Add Company");
	            System.out.println("2: Retrieve All Companies");
	            System.out.println("3: Retrieve Company by ID");
	            System.out.println("4: Update Company");
	            System.out.println("5: Delete Company");

	            int choice = scanner.nextInt();
	            scanner.nextLine();  // Consume the newline character

	            switch (choice) {
	                case 1:  // Add a new Company
	                    System.out.println("Enter Company Name:");
	                    String name = scanner.nextLine();

	                    System.out.println("Enter Company Location:");
	                    String location = scanner.nextLine();

	                    System.out.println("Enter Company Sector:");
	                    String sector = scanner.nextLine();

	                    System.out.println("Enter Company Industry:");
	                    String industry = scanner.nextLine();

	                    System.out.println("Enter Year of Founding:");
	                    int year = scanner.nextInt();

	                    System.out.println("Enter Month of Founding:");
	                    int month = scanner.nextInt();

	                    System.out.println("Enter Day of Founding:");
	                    int day = scanner.nextInt();

	                    System.out.println("Enter Company Revenue:");
	                    BigDecimal revenue = scanner.nextBigDecimal();

	                    Companies company = new Companies();
	                    company.setName(name);
	                    company.setLocation(location);
	                    company.setSector(sector);
	                    company.setIndustry(industry);
	                    company.setFounded(LocalDate.of(year, month, day));
	                    company.setRevenue(revenue);

	                    companiesService.addCompany(company);
	                    System.out.println("New Company added successfully.");
	                    break;

	                case 2:  // Retrieve All Companies
	                    List<Companies> allCompanies = companiesService.getAllCompanies();
	                    System.out.println("All Companies:");
	                    for (Companies c : allCompanies) {
	                        System.out.println(c.getName());
	                    }
	                    break;

	                case 3:  // Retrieve Company by ID
	                    System.out.println("Enter Company ID:");
	                    int companyId = scanner.nextInt();

	                    Companies retrievedCompany = companiesService.getCompanyById(companyId);
	                    if (retrievedCompany != null) {
	                        System.out.println("Company: " + retrievedCompany.getName());
	                    } else {
	                        System.out.println("Company not found.");
	                    }
	                    break;

	                case 4:  // Update Company
	                    System.out.println("Enter Company ID to Update:");
	                    int updateId = scanner.nextInt();
	                    scanner.nextLine();  // Consume the newline

	                    Companies companyToUpdate = companiesService.getCompanyById(updateId);
	                    if (companyToUpdate != null) {
	                        System.out.println("Select the fields you want to update (enter 'yes' or 'no'):");

	                        // Optional: Update Company Name
	                        System.out.println("Do you want to update the Company Name? (yes/no)");
	                        String updateName = scanner.nextLine();
	                        if (updateName.equalsIgnoreCase("yes")) {
	                            System.out.println("Enter New Company Name:");
	                            String newName = scanner.nextLine();
	                            companyToUpdate.setName(newName);
	                        }

	                        // Optional: Update Location
	                        System.out.println("Do you want to update the Location? (yes/no)");
	                        String updateLocation = scanner.nextLine();
	                        if (updateLocation.equalsIgnoreCase("yes")) {
	                            System.out.println("Enter New Location:");
	                            String newLocation = scanner.nextLine();
	                            companyToUpdate.setLocation(newLocation);
	                        }

	                        // Optional: Update Sector
	                        System.out.println("Do you want to update the Sector? (yes/no)");
	                        String updateSector = scanner.nextLine();
	                        if (updateSector.equalsIgnoreCase("yes")) {
	                            System.out.println("Enter New Sector:");
	                            String newSector = scanner.nextLine();
	                            companyToUpdate.setSector(newSector);
	                        }

	                        // Optional: Update Industry
	                        System.out.println("Do you want to update the Industry? (yes/no)");
	                        String updateIndustry = scanner.nextLine();
	                        if (updateIndustry.equalsIgnoreCase("yes")) {
	                            System.out.println("Enter New Industry:");
	                            String newIndustry = scanner.nextLine();
	                            companyToUpdate.setIndustry(newIndustry);
	                        }

	                        // Optional: Update Revenue
	                        System.out.println("Do you want to update the Revenue? (yes/no)");
	                        String updateRevenue = scanner.nextLine();
	                        if (updateRevenue.equalsIgnoreCase("yes")) {
	                            System.out.println("Enter New Revenue:");
	                            BigDecimal newRevenue = scanner.nextBigDecimal();
	                            scanner.nextLine();  // Consume the newline
	                            companyToUpdate.setRevenue(newRevenue);
	                        }

	                        // Optional: Update Founded Date
	                        System.out.println("Do you want to update the Founded Date? (yes/no)");
	                        String updateFounded = scanner.nextLine();
	                        if (updateFounded.equalsIgnoreCase("yes")) {
	                            System.out.println("Enter New Year of Founding:");
	                            int newYear = scanner.nextInt();
	                            System.out.println("Enter New Month of Founding:");
	                            int newMonth = scanner.nextInt();
	                            System.out.println("Enter New Day of Founding:");
	                            int newDay = scanner.nextInt();
	                            scanner.nextLine();  // Consume the newline
	                            companyToUpdate.setFounded(LocalDate.of(newYear, newMonth, newDay));
	                        }

	                        // Save the updates
	                        companiesService.updateCompany(companyToUpdate);
	                        System.out.println("Company details updated successfully.");
	                    } else {
	                        System.out.println("Company not found.");
	                    }
	                    break;

	                case 5:  // Delete Company
	                    System.out.println("Enter Company ID to Delete:");
	                    int deleteId = scanner.nextInt();

	                    Companies companyToDelete = companiesService.getCompanyById(deleteId);
	                    if (companyToDelete != null) {
	                        companiesService.deleteCompany(companyToDelete.getCompanyId());
	                        System.out.println("Company deleted successfully.");
	                    } else {
	                        System.out.println("Company not found.");
	                    }
	                    break;
                      case 6:
		                // Exit
		                exit = true;
		                System.out.println("Exiting Companies Operations.");
		                break;
	                default:
	                    System.out.println("Invalid choice. Please try again.");
	                    break;
	            }
	            }

	            // Commit the transaction after successful operations
	            session.getTransaction().commit();
	            System.out.println("Transaction committed successfully.");
	        } catch (Exception e) {
	            e.printStackTrace();
	        } finally {
	            // Ensure the session factory is closed properly
	            sessionFactory.close();
	        }
        }*/
		 
		/*try (Session session = sessionFactory.openSession()) {

            // Begin transaction once for all operations
            session.beginTransaction();

            // Initialize DAOs and Services
            UsersDAO usersDAO = new UsersDAOImpl(sessionFactory);
            UsersService usersService = new UsersServiceImpl(usersDAO);

            CompaniesDAO companiesDao = new CompaniesDAOImpl(sessionFactory);
            CompaniesService companiesService = new CompaniesServiceImpl(companiesDao);

            JobProvidersDAO jobProvidersDAO = new JobProvidersDAOImpl(sessionFactory);
            JobProvidersService jobProvidersService = new JobProvidersServiceImpl(jobProvidersDAO);

            
            boolean exit = false;

            while (!exit) {
                System.out.println("\nChoose an operation:");
                System.out.println("1. Add Job Provider");
                System.out.println("2. Retrieve Job Provider by ID");
                System.out.println("3. Update Job Provider");
                System.out.println("4. Delete Job Provider");
                System.out.println("5. Exit");

                System.out.print("Enter your choice: ");
                int choice = scanner.nextInt();
                scanner.nextLine();  // Consume the newline character

                switch (choice) {
                    case 1:  // Add Job Provider
                        System.out.print("Enter User ID: ");
                        int userId = scanner.nextInt();
                        scanner.nextLine();  // Consume newline

                        Users user = usersService.getUserById(userId);
                        if (user != null) {
                            JobProviders existingProvider = jobProvidersService.getJobProviderByUserId(user.getUserId());
                            if (existingProvider == null) {
                                JobProviders newProvider = new JobProviders();

                                System.out.print("Enter Designation: ");
                                String designation = scanner.nextLine();
                                newProvider.setDesignation(designation);
                                newProvider.setUser1(user);

                                System.out.print("Enter Company ID: ");
                                int companyId = scanner.nextInt();
                                scanner.nextLine();  // Consume newline

                                Companies company = companiesService.getCompanyById(companyId);
                                if (company != null) {
                                    newProvider.setCompany(company);
                                    jobProvidersService.addJobProvider(newProvider);
                                    System.out.println("Job Provider added successfully.");
                                } else {
                                    System.out.println("Company not found!");
                                }
                            } else {
                                System.out.println("Job Provider already exists for this user.");
                            }
                        } else {
                            System.out.println("User not found!");
                        }
                        break;

                    case 2:  // Retrieve Job Provider by ID
                        System.out.print("Enter Job Provider ID: ");
                        int providerId = scanner.nextInt();
                        scanner.nextLine();  // Consume newline

                        JobProviders retrievedProvider = jobProvidersService.getJobProviderById(providerId);
                        if (retrievedProvider != null) {
                            System.out.println("Job Provider Details:");
                            System.out.println("Designation: " + retrievedProvider.getDesignation());
                            System.out.println("Company: " + retrievedProvider.getCompany().getName());
                        } else {
                            System.out.println("Job Provider not found.");
                        }
                        break;

                    case 3:  // Update Job Provider
                        System.out.print("Enter Job Provider ID to Update: ");
                        int updateId = scanner.nextInt();
                        scanner.nextLine();  // Consume newline

                        JobProviders providerToUpdate = jobProvidersService.getJobProviderById(updateId);
                        if (providerToUpdate != null) {
                            System.out.print("Enter New Designation (Leave empty to skip): ");
                            String newDesignation = scanner.nextLine();
                            if (!newDesignation.isEmpty()) {
                                providerToUpdate.setDesignation(newDesignation);
                            }

                            System.out.print("Enter New Company ID (Leave 0 to skip): ");
                            int newCompanyId = scanner.nextInt();
                            scanner.nextLine();  // Consume newline
                            if (newCompanyId != 0) {
                                Companies newCompany = companiesService.getCompanyById(newCompanyId);
                                if (newCompany != null) {
                                    providerToUpdate.setCompany(newCompany);
                                } else {
                                    System.out.println("Company not found.");
                                }
                            }

                            jobProvidersService.updateJobProvider(providerToUpdate);
                            System.out.println("Job Provider updated successfully.");
                        } else {
                            System.out.println("Job Provider not found.");
                        }
                        break;

                    case 4:  // Delete Job Provider
                        System.out.print("Enter Job Provider ID to Delete: ");
                        int deleteId = scanner.nextInt();
                        scanner.nextLine();  // Consume newline

                        JobProviders providerToDelete = jobProvidersService.getJobProviderById(deleteId);
                        if (providerToDelete != null) {
                            jobProvidersService.deleteJobProvider(providerToDelete.getJobProviderId());
                            System.out.println("Job Provider deleted successfully.");
                        } else {
                            System.out.println("Job Provider not found.");
                        }
                        break;

                    case 5:  // Exit
                        exit = true;
                        System.out.println("Exiting JobProviders Operations.");
                        break;

                    default:
                        System.out.println("Invalid choice. Please try again.");
                        break;
                }
            }

            // Commit transaction after operations
            session.getTransaction().commit();
            System.out.println("Transaction committed successfully.");

        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            // Ensure the session factory is closed
            sessionFactory.close();
        }
        }*/
		
		  
		/*try (Session session = sessionFactory.openSession()) {
		    session.beginTransaction();

		    // Initialize DAO and Service
		    JobSeekersDAO jobSeekersDAO = new JobSeekersDAOImpl(sessionFactory);
		    JobSeekersService jobSeekersService = new JobSeekersServiceImpl(jobSeekersDAO);
		    EducationsDAO educationsDao = new EducationsDAOImpl(sessionFactory);
		    EducationsService educationsService = new EducationsServiceImpl(educationsDao);
            boolean exit = false;

		    while (!exit) {
		        System.out.println("Select an operation:");
		        System.out.println("1. Add Education");
		        System.out.println("2. Retrieve All Educations");
		        System.out.println("3. Retrieve Education by ID");
		        System.out.println("4. Update Education");
		        System.out.println("5. Delete Education");
		        System.out.println("6. Exit");
		        
		        int choice = scanner.nextInt();
		        scanner.nextLine(); // Consume newline

		        switch (choice) {
		            case 1: // Add Education
		                System.out.println("Enter Job Seeker ID:");
		                int jobSeekerId = scanner.nextInt();
		                scanner.nextLine(); // Consume newline

		                JobSeekers jobSeeker = jobSeekersService.getJobSeekerById(jobSeekerId);
		                if (jobSeeker != null) {
		                    Educations education = new Educations();
		                    System.out.println("Enter Education Level:");
		                    education.setEducationLevel(scanner.nextLine());
		                    System.out.println("Enter Course Type:");
		                    education.setCourseType(scanner.nextLine());
		                    System.out.println("Enter Course:");
		                    education.setCourse(scanner.nextLine());
		                    System.out.println("Enter Institute:");
		                    education.setInstitute(scanner.nextLine());
		                    System.out.println("Enter Pass Out Year:");
		                    education.setPassOutYear(scanner.nextInt());
		                    System.out.println("Enter Percentage:");
		                    education.setPercentage(scanner.nextDouble());
		                    scanner.nextLine(); // Consume newline
		                    System.out.println("Enter Project Titles:");
		                    education.setProjecttitles(scanner.nextLine());

		                    education.setJobSeekers(jobSeeker); // Associate the Education with the Job Seeker
		                    educationsService.addEducation(education);
		                    System.out.println("Education added successfully for Job Seeker with ID " + jobSeekerId + ".");
		                } else {
		                    System.out.println("Job Seeker with ID " + jobSeekerId + " not found.");
		                }
		                break;

		            case 2: // Retrieve All Educations
		                List<Educations> allEducations = educationsService.getAllEducations();
		                System.out.println("All Educations:");
		                for (Educations e : allEducations) {
		                    System.out.println(e.getEducationLevel() + " - " + e.getCourseType() + " - " + e.getCourse());
		                }
		                break;

		            case 3: // Retrieve Education by ID
		                System.out.println("Enter Education ID:");
		                int educationId = scanner.nextInt();
		                Educations retrievedEducation = educationsService.getEducationById(educationId);
		                if (retrievedEducation != null) {
		                    System.out.println("Education Details:");
		                    System.out.println("Institute: " + retrievedEducation.getInstitute());
		                    System.out.println("Course Type: " + retrievedEducation.getCourseType());
		                    System.out.println("Course: " + retrievedEducation.getCourse());
		                    System.out.println("Percentage: " + retrievedEducation.getPercentage());
		                    System.out.println("Pass Out Year: " + retrievedEducation.getPassOutYear());
		                } else {
		                    System.out.println("No education found for the given ID.");
		                }
		                break;

		            case 4: // Update Education
		                System.out.println("Enter Education ID to update:");
		                int educationIdToUpdate = Integer.parseInt(scanner.nextLine());

		                Educations educationToUpdate = educationsService.getEducationById(educationIdToUpdate);
		                if (educationToUpdate != null) {
		                    System.out.println("Current details:");
		                    System.out.println("Education Level: " + educationToUpdate.getEducationLevel());
		                    System.out.println("Course Type: " + educationToUpdate.getCourseType());
		                    System.out.println("Course: " + educationToUpdate.getCourse());
		                    System.out.println("Institute: " + educationToUpdate.getInstitute());
		                    System.out.println("Pass Out Year: " + educationToUpdate.getPassOutYear());
		                    System.out.println("Percentage: " + educationToUpdate.getPercentage());
		                    System.out.println("Project Titles: " + educationToUpdate.getProjecttitles());

		                    // Update Education Level
		                    System.out.println("Enter new Education Level (leave blank to keep current):");
		                    String newEducationLevel = scanner.nextLine();
		                    if (!newEducationLevel.isEmpty()) {
		                        educationToUpdate.setEducationLevel(newEducationLevel);
		                    }

		                    // Update Course Type
		                    System.out.println("Enter new Course Type (leave blank to keep current):");
		                    String newCourseType = scanner.nextLine();
		                    if (!newCourseType.isEmpty()) {
		                        educationToUpdate.setCourseType(newCourseType);
		                    }

		                    // Update Course
		                    System.out.println("Enter new Course (leave blank to keep current):");
		                    String newCourse = scanner.nextLine();
		                    if (!newCourse.isEmpty()) {
		                        educationToUpdate.setCourse(newCourse);
		                    }

		                    // Update Institute
		                    System.out.println("Enter new Institute (leave blank to keep current):");
		                    String newInstitute = scanner.nextLine();
		                    if (!newInstitute.isEmpty()) {
		                        educationToUpdate.setInstitute(newInstitute);
		                    }

		                    // Update Pass Out Year
		                    System.out.println("Enter new Pass Out Year (leave blank to keep current):");
		                    String newPassOutYearInput = scanner.nextLine();
		                    if (!newPassOutYearInput.isEmpty()) {
		                        int newPassOutYear = Integer.parseInt(newPassOutYearInput);
		                        educationToUpdate.setPassOutYear(newPassOutYear);
		                    }

		                    // Update Percentage
		                    System.out.println("Enter new Percentage (leave blank to keep current):");
		                    String newPercentageInput = scanner.nextLine();
		                    if (!newPercentageInput.isEmpty()) {
		                        double newPercentage = Double.parseDouble(newPercentageInput);
		                        educationToUpdate.setPercentage(newPercentage);
		                    }

		                    // Update Project Titles
		                    System.out.println("Enter new Project Titles (leave blank to keep current):");
		                    String newProjectTitles = scanner.nextLine();
		                    if (!newProjectTitles.isEmpty()) {
		                        educationToUpdate.setProjecttitles(newProjectTitles);
		                    }

		                    // Save the updated education
		                    educationsService.updateEducation(educationToUpdate);
		                    System.out.println("Education updated successfully.");
		                } else {
		                    System.out.println("Education not found for the given ID.");
		                }
		                break;


		            case 5: // Delete Education
		                System.out.println("Enter Education ID to delete:");
		                int deleteEducationId = scanner.nextInt();
		                educationsService.deleteEducation(deleteEducationId);
		                System.out.println("Education deleted successfully.");
		                break;

		            case 6: // Exit
		                exit = true;
		                System.out.println("Exiting...");
		                break;

		            default:
		                System.out.println("Invalid choice. Please try again.");
		        }
		    }

		    session.getTransaction().commit();
		    System.out.println("Transaction committed successfully.");
		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		    sessionFactory.close();
		}

				}*/
		
		/*try (Session session = sessionFactory.openSession()) {
		    // Begin a new transaction
		    session.beginTransaction();
		    
		    // ---Jobs Operations---
		    JobProvidersDAO jobProvidersDAO = new JobProvidersDAOImpl(sessionFactory);
		    JobProvidersService jobProvidersService = new JobProvidersServiceImpl(jobProvidersDAO);
		    
		    CompaniesDAO companiesDao = new CompaniesDAOImpl(sessionFactory);
		    CompaniesService companiesService = new CompaniesServiceImpl(companiesDao);
		    
		    JobsDAO jobsDao = new JobsDAOImpl(sessionFactory);
		    JobsService jobsService = new JobsServiceImpl(jobsDao);
		    
		    
		    boolean exit = false;

		    while (!exit) {
		        System.out.println("Job Operations Menu:");
		        System.out.println("1. Add Job");
		        System.out.println("2. Retrieve All Jobs");
		        System.out.println("3. Retrieve Job by ID");
		        System.out.println("4. Update Job");
		        System.out.println("5. Delete Job");
		        System.out.println("0. Exit");
		        System.out.print("Enter your choice: ");
		        
		        int choice = Integer.parseInt(scanner.nextLine());

		        switch (choice) {
		            case 1: // Add Job
		                System.out.println("Enter Job Provider ID:");
		                int jobProviderId = Integer.parseInt(scanner.nextLine());
		                JobProviders jobProvider = jobProvidersService.getJobProviderById(jobProviderId);
		                
		                if (jobProvider != null) {
		                    System.out.println("Enter Company ID:");
		                    int companyId = Integer.parseInt(scanner.nextLine());
		                    Companies company = companiesService.getCompanyById(companyId);
		                    
		                    if (company != null) {
		                        Jobs job = new Jobs();
		                        System.out.println("Enter Job Title:");
		                        job.setTitle(scanner.nextLine());
		                        System.out.println("Enter Job Description:");
		                        job.setDescription(scanner.nextLine());
		                        System.out.println("Enter Job Location:");
		                        job.setLocation(scanner.nextLine());
		                        job.setPostedAt(LocalDateTime.now());
		                        System.out.println("Enter Job Qualification:");
		                        job.setQualification(scanner.nextLine());
		                        System.out.println("Enter Job Salary:");
		                        job.setSalary(new BigDecimal(scanner.nextLine()));
		                        System.out.println("Enter Job Type (e.g., Full-time, Part-time):");
		                        job.setJobType(scanner.nextLine());
		                        
		                        // Associate the job with the existing job provider and company
		                        job.setJobProvidersJobs(jobProvider);
		                        job.setCompanies(company);
		                        
		                        // Add the job
		                        jobsService.addJob(job);
		                        System.out.println("Job added successfully.");
		                    } else {
		                        System.out.println("Company not found.");
		                    }
		                } else {
		                    System.out.println("Job Provider not found.");
		                }
		                break;

		            case 2: // Retrieve All Jobs
		                List<Jobs> allJobs = jobsService.getAllJobs();
		                System.out.println("All Jobs:");
		                for (Jobs j : allJobs) {
		                    System.out.println(j.getTitle() + " - " + j.getLocation());
		                }
		                break;

		            case 3: // Retrieve Job by ID
		                System.out.println("Enter Job ID to retrieve:");
		                int jobIdRetrieve = Integer.parseInt(scanner.nextLine());
		                Jobs retrievedJob = jobsService.getJobById(jobIdRetrieve);
		                
		                if (retrievedJob != null) {
		                    System.out.println("Job Details:");
		                    System.out.println("Title: " + retrievedJob.getTitle());
		                    System.out.println("Description: " + retrievedJob.getDescription());
		                    System.out.println("Location: " + retrievedJob.getLocation());
		                    System.out.println("Qualification: " + retrievedJob.getQualification());
		                    System.out.println("Salary: " + retrievedJob.getSalary());
		                    System.out.println("Job Type: " + retrievedJob.getJobType());
		                } else {
		                    System.out.println("Job not found for ID: " + jobIdRetrieve);
		                }
		                break;

		            case 4: // Update Job
		                System.out.println("Enter Job ID to update:");
		                int jobIdUpdate = Integer.parseInt(scanner.nextLine());
		                Jobs jobToUpdate = jobsService.getJobById(jobIdUpdate);
		                
		                if (jobToUpdate != null) {
		                    System.out.println("Current Description: " + jobToUpdate.getDescription());
		                    System.out.println("Enter new Description (leave blank to keep current):");
		                    String newDescription = scanner.nextLine();
		                    if (!newDescription.isEmpty()) {
		                        jobToUpdate.setDescription(newDescription);
		                    }
		                    
		                    System.out.println("Current Salary: " + jobToUpdate.getSalary());
		                    System.out.println("Enter new Salary (leave blank to keep current):");
		                    String newSalary = scanner.nextLine();
		                    if (!newSalary.isEmpty()) {
		                        jobToUpdate.setSalary(new BigDecimal(newSalary));
		                    }
		                    
		                    // Add more fields to update as needed...

		                    // Save the updated job
		                    jobsService.updateJob(jobToUpdate);
		                    System.out.println("Job updated successfully.");
		                } else {
		                    System.out.println("Job not found for ID: " + jobIdUpdate);
		                }
		                break;

		            case 5: // Delete Job
		                System.out.println("Enter Job ID to delete:");
		                int jobIdDelete = Integer.parseInt(scanner.nextLine());
		                jobsService.deleteJob((long) jobIdDelete); // Cast to Long
		                System.out.println("Job deleted successfully.");
		                break;


		            case 6: // Exit
		                exit = true;
		                System.out.println("Exiting Job Operations.");
		                break;

		            default:
		                System.out.println("Invalid choice. Please try again.");
		                break;
		        }
		    }

		    // Commit the transaction after all operations
		    session.getTransaction().commit();
		    System.out.println("Transaction committed successfully.");
		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		    // Ensure the session factory is closed when the program finishes
		    sessionFactory.close();
		}
        }*/
		
		
		try (Session session = sessionFactory.openSession()) {
		    // Begin a new transaction
		    session.beginTransaction();

		    // ---Applications Operations---
		    ApplicationsDAO applicationsDao = new ApplicationsDAOImpl(sessionFactory);
		    ApplicationsService applicationsService = new ApplicationsServiceImpl(applicationsDao);

		    JobSeekersDAO jobSeekersDao = new JobSeekersDAOImpl(sessionFactory);
		    JobSeekersService jobSeekersService = new JobSeekersServiceImpl(jobSeekersDao);

		    JobsDAO jobsDao = new JobsDAOImpl(sessionFactory);
		    JobsService jobsService = new JobsServiceImpl(jobsDao);

		    boolean exit = false;
		    while (!exit) {
		        System.out.println("Select an operation:");
		        System.out.println("1. Add Application");
		        System.out.println("2. View All Applications");
		        System.out.println("3. View Application Details");
		        System.out.println("4. Update Application");
		        System.out.println("5. Delete Application");
		        System.out.println("6. Exit");

		       
		        int choice = scanner.nextInt();
		        scanner.nextLine(); // Consume newline

		        switch (choice) {
		            case 1:
		                // Add Application
		                System.out.print("Enter JobSeeker ID: ");
		                int jobSeekerId = scanner.nextInt();
		                scanner.nextLine(); // Consume newline
		                System.out.print("Enter Job ID: ");
		                int jobId = scanner.nextInt();
		                scanner.nextLine(); // Consume newline
		                System.out.print("Enter Resume File Path: ");
		                String resumeFilePath = scanner.nextLine();

		                JobSeekers existingJobSeeker = jobSeekersService.getJobSeekerById(jobSeekerId);
		                Jobs existingJob = jobsService.getJobById(jobId);

		                if (existingJobSeeker != null && existingJob != null) {
		                    Applications application = new Applications();
		                    application.setStatus("Pending");
		                    application.setResumeFilePath(resumeFilePath);
		                    application.setAppliedAt(LocalDateTime.now());
		                    application.setJobSeeker(existingJobSeeker);
		                    application.setJob(existingJob);

		                    applicationsService.addApplication(application);
		                    System.out.println("Application added successfully.");
		                } else {
		                    if (existingJobSeeker == null) {
		                        System.out.println("JobSeeker not found for ID: " + jobSeekerId);
		                    }
		                    if (existingJob == null) {
		                        System.out.println("Job not found for ID: " + jobId);
		                    }
		                }
		                break;

		            case 2:
		                // View All Applications
		                List<Applications> allApplications = applicationsService.getAllApplications();
		                System.out.println("All Applications:");
		                for (Applications app : allApplications) {
		                    System.out.println(app.getStatus() + " - " + app.getResumeFilePath());
		                }
		                break;

		            case 3:
		                // View Application Details
		                System.out.print("Enter Application ID: ");
		                int existingApplicationId = scanner.nextInt();
		                Applications retrievedApplication = applicationsService.getApplicationById(existingApplicationId);
		                if (retrievedApplication != null) {
		                    System.out.println("Application Details: " + retrievedApplication.getStatus());
		                } else {
		                    System.out.println("Application not found for the given ID.");
		                }
		                break;

		            case 4:
		                // Update Application
		                System.out.print("Enter Application ID: ");
		                int updateApplicationId = scanner.nextInt();
		                Applications applicationToUpdate = applicationsService.getApplicationById(updateApplicationId);
		                if (applicationToUpdate != null) {
		                    System.out.print("Enter New Status: ");
		                    String newStatus = scanner.next();
		                    applicationToUpdate.setStatus(newStatus);
		                    applicationsService.updateApplication(applicationToUpdate);
		                    System.out.println("Application updated successfully.");
		                } else {
		                    System.out.println("Application not found for the given ID.");
		                }
		                break;

		            case 5:
		                // Delete Application
		                System.out.print("Enter Application ID: ");
		                int deleteApplicationId = scanner.nextInt();
		                applicationsService.deleteApplication(deleteApplicationId);
		                System.out.println("Application deleted successfully.");
		                break;

		            case 6:
		                // Exit
		                exit = true;
		                System.out.println("Exiting Applications Operations.");
		                break;

		            default:
		                System.out.println("Invalid choice. Please try again.");
		        }
		    }

		    // Commit the transaction after the operations
		    session.getTransaction().commit();
		    System.out.println("Transaction committed successfully.");
		} catch (Exception e) {
		    e.printStackTrace();
		} finally {
		    // Ensure the session factory is closed when the program finishes
		    sessionFactory.close();
		}
        }
        else {
            System.out.println("Invalid credentials. Exiting...");
        }

        // Close the scanner resource
        scanner.close();
    
	}
}

		 
		 
		 
		 
		
	

