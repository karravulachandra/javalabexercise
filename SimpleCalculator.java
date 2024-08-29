package day1;

import java.util.Scanner;

	public class SimpleCalculator {

	    public static void main(String[] args) {
	        Scanner scanner = new Scanner(System.in);

	        System.out.println("Welcome to the Simple Calculator!");
	        System.out.println("Please choose an operation: +, -, *, /");
	        String operation = scanner.next();       
	        System.out.println("Enter the first number:");
	        double num1 = scanner.nextDouble();
	        System.out.println("Enter the second number:");
	        double num2 = scanner.nextDouble();
	        double result = 0;
	        boolean validOperation = true;
	        switch (operation) {
	            case "+":
	                result = num1 + num2;
	                break;
	            case "-":
	                result = num1 - num2;
	                break;  
	            case "*":
	                result = num1 * num2; 
	                break;
	            case "/":
	                if (num2 != 0) {
	                    result = num1 / num2;
	                } else {
	                    System.out.println("Error: Division by zero is not allowed.");
	                    validOperation = false;
	                }
	                break;
	            default:
	                System.out.println("Error: Invalid operation.");
	                validOperation = false;
	        }
	        if (validOperation) {
	            System.out.println("The result of " + num1 + " " + operation + " " + num2 + " is: " + result);
	        }
	        scanner.close();
	    }
	}


