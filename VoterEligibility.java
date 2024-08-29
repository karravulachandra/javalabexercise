package day1;
import java.util.Scanner;

	public class VoterEligibility {
	    private int birthYear;
	    private int currentYear;
	    private int age;

	    public VoterEligibility(int birthYear) {
	        this.birthYear = birthYear;
	        this.currentYear = 2024; // You can dynamically fetch the current year using the Calendar class
	        this.age = calculateAge();
	    }

	    private int calculateAge() {
	        return this.currentYear - this.birthYear;
	    }

	    public String checkEligibility() {
	        if (this.age >= 18) {
	            return "You are eligible to vote.";
	        } else {
	            return "You are not eligible to vote.";
	        }
	    }

	    public int getAge() {
	        return this.age;
	    }

	    public static void main(String[] args) {
	        Scanner scanner = new Scanner(System.in);
	        System.out.print("Enter your birth year: ");
	        int birthYear = scanner.nextInt();

	        VoterEligibility voter = new VoterEligibility(birthYear);

	        System.out.println("Your age is: " + voter.getAge());
	        System.out.println(voter.checkEligibility());

	        scanner.close();
	    }
	}


