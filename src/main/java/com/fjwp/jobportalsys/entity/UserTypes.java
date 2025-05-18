package com.fjwp.jobportalsys.entity;
import java.util.Set;   
import java.util.HashSet; 
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.NotNull;

@Entity
public class UserTypes {
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    @Column(name = "user_type_id")
	    private Long userTypeId;

	    @Column(name = "category", nullable = false, length = 50, unique = true)
	   
	    
	    @NotNull(message = "Category cannot be null")
	    private String category;
	    
	 // Correctly declare as a collection type like Set or List
	    @OneToMany(mappedBy = "userTypes",cascade = CascadeType.ALL)
	    private Set<Users> users = new HashSet<>();

	    public UserTypes() {
	    	
	    }

		public UserTypes(String category, Set<Users> users) {
			super();
			this.category = category;
			this.users = users;
		}

		public Long getUserTypeId() {
			return userTypeId;
		}

		public void setUserTypeId(Long userTypeId) {
			this.userTypeId = userTypeId;
		}

		public String getCategory() {
			return category;
		}

		public void setCategory(String category) {
			this.category = category;
		}

		public Set<Users> getUsers() {
			return users;
		}

		public void setUsers(Set<Users> users) {
			this.users = users;
		}

		
}
