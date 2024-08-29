package Strings;
import java.util.Scanner;
public class NumberAddition {

	    public static void main(String[] args) {
	        Scanner scanner = new Scanner(System.in);
	        
	        System.out.print("Enter the first number: ");
	        String num1Str = scanner.nextLine();
	        
	        System.out.print("Enter the second number: ");
	        String num2Str = scanner.nextLine();
	        
	        try {
	            double num1 = Double.parseDouble(num1Str);
	            double num2 = Double.parseDouble(num2Str);
	            
	            double sum = num1 + num2;
	            
	            System.out.println("The sum is: " + sum);
	        } catch (NumberFormatException e) {
	            System.out.println("Invalid input. Please enter valid numbers.");
	        }
	        
	        scanner.close();
	    
	}
}
