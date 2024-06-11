package day1;

public class ArraySum {
	
	    public static void main(String[] args) {
	        // Example array
	        int[] numbers = {1, 2, 3, 4, 5};
	        
	        // Calculate the sum of the array elements
	        int sum = calculateSum(numbers);
	        
	        // Print the result
	        System.out.println("The sum of the array elements is: " + sum);
	    }

	    // Method to calculate the sum of an integer array
	    public static int calculateSum(int[] array) {
	        int sum = 0;
	        for (int num : array) {
	            sum += num;
	        }
	        return sum;
	    }
	}


