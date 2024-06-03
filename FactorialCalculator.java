package day1;
import java.util.Scanner;

	public class FactorialCalculator {

	    public static long factorialIterative(int n) {
	        long result = 1;
	        for (int i = 1; i <= n; i++) {
	            result *= i;
	        }
	        return result;
	    }

	    public static long factorialRecursive(int n) {
	        if (n == 0 || n == 1) {
	            return 1;
	        }
	        return n * factorialRecursive(n - 1);
	    }

	    public static void main(String[] args) {
	        Scanner scanner = new Scanner(System.in);

	        System.out.print("Enter a number to calculate its factorial: ");
	        int number = scanner.nextInt();

	        long iterativeResult = factorialIterative(number);
	        System.out.println("Factorial of " + number + " (Iterative): " + iterativeResult);

	        long recursiveResult = factorialRecursive(number);
	        System.out.println("Factorial of " + number + " (Recursive): " + recursiveResult);
	    }
	}

