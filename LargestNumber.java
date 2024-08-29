package day1;

public class LargestNumber {

	    // Parameterized function to find the largest of three numbers
	    public static int findLargest(int num1, int num2, int num3) {
	        // Assume num1 is the largest
	        int largest = num1;

	        // Compare largest with num2
	        if (num2 > largest) {
	            largest = num2;
	        }

	        // Compare largest with num3
	        if (num3 > largest) {
	            largest = num3;
	        }

	        // Return the largest number
	        return largest;
	    }

	    public static void main(String[] args) {
	        // Example numbers to check
	        int number1 = 15;
	        int number2 = 27;
	        int number3 = 9;
	        // Find and print the largest number
	        int largestNumber = findLargest(number1, number2, number3);
	        System.out.println("The largest number is: " + largestNumber);
	    }
	}

