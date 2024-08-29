package day1;
	import java.util.Arrays;
	import java.util.HashSet;
	import java.util.Set;

	public class RemoveDuplicates {
	    public static void main(String[] args) {
	        // Sample array with duplicates
	        int[] numbers = {1, 2, 3, 4, 5, 2, 3, 6, 7, 4};

	        // Remove duplicates
	        int[] uniqueNumbers = removeDuplicates(numbers);

	        // Print the result
	        System.out.println("Array without duplicates: " + Arrays.toString(uniqueNumbers));
	    }

	    public static int[] removeDuplicates(int[] array) {
	        Set<Integer> uniqueElements = new HashSet<>();
	        for (int num : array) {
	            uniqueElements.add(num);
	        }

	        int[] result = new int[uniqueElements.size()];
	        int index = 0;
	        for (int num : uniqueElements) {
	            result[index++] = num;
	        }

	        return result;
	    }
	}


