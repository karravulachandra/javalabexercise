package day1;

import java.util.Scanner;
	public class FibonacciSeries {
	    public static void generateFibonacci(int n) {
	        if (n <= 0) {
	            System.out.println("The number of terms must be positive.");
	            return;
	        }

	        long firstTerm = 0;
	        long secondTerm = 1;

	        System.out.print("Fibonacci Series: " + firstTerm);

	        if (n > 1) {
	            System.out.print(", " + secondTerm);
	        }

	        for (int i = 3; i <= n; i++) {
	            long nextTerm = firstTerm + secondTerm;
	            System.out.print(", " + nextTerm);
	            firstTerm = secondTerm;
	            secondTerm = nextTerm;
	        }

	        System.out.println();  
	    }

	    public static void main(String[] args) {
	        Scanner scanner = new Scanner(System.in);

	        System.out.print("Enter the number of terms: ");
	        int numberOfTerms = scanner.nextInt();

	        generateFibonacci(numberOfTerms);
	    }
	}
