package day1;

public class ArthemeticOperations {
	

	    // Parameterized function to perform arithmetic operations
	    public static double[] performOperations(double num1, double num2) {
	        double[] results = new double[4];

	        // Addition
	        results[0] = num1 + num2;

	        // Subtraction
	        results[1] = num1 - num2;

	        // Multiplication
	        results[2] = num1 * num2;

	        // Division (check for division by zero)
	        if (num2 != 0) {
	            results[3] = num1 / num2;
	        } else {
	            results[3] = Double.NaN; // Not a Number (NaN) if division by zero
	        }

	        return results;
	    }

	    public static void main(String[] args) {
	        // Example numbers to perform operations on
	        double number1 = 15.5;
	        double number2 = 3.0;

	        // Perform arithmetic operations
	        double[] results = performOperations(number1, number2);

	        // Print the results
	        System.out.println("Addition: " + results[0]);
	        System.out.println("Subtraction: " + results[1]);
	        System.out.println("Multiplication: " + results[2]);
	        System.out.println("Division: " + results[3]);
	    }
	}


