import java.util.Scanner;

public class VoterEligibility {
    private int birthYear;
    private int age;
    
    // Constructor to initialize birthYear and calculate age
    public VoterEligibility(int birthYear) {
        this.birthYear = birthYear;
        this.age = calculateAge(birthYear);
    }
    
    // Method to calculate age
    private int calculateAge(int birthYear) {
        int currentYear = java.util.Calendar.getInstance().get(java.util.Calendar.YEAR);
        return currentYear - birthYear;
    }
    
    // Method to check voting eligibility
    public boolean isEligibleToVote() {
        return this.age >= 18;
    }
    
    // Method to display age and eligibility status
    public void displayInfo() {
        System.out.println("Your age is: " + this.age);
        if (isEligibleToVote()) {
            System.out.println("You are eligible to vote.");
        } else {
            System.out.println("You are not eligible to vote.");
        }
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter their birth year
        System.out.print("Enter your birth year: ");
        int birthYear = scanner.nextInt();

        // Create an instance of VoterEligibility
        VoterEligibility voter = new VoterEligibility(birthYear);

        // Display age and eligibility status
        voter.displayInfo();

        scanner.close();
    }
}
