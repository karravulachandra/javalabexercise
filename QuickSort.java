package JC;

public class QuickSort {

	    // Main method to sort an array
	    public static void quickSort(int[] arr, int low, int high) {
	        if (low < high) {
	            // Find the pivot element's correct position in the sorted array
	            int pi = partition(arr, low, high);

	            // Recursively sort elements before and after partition
	            quickSort(arr, low, pi - 1); // Recursive call for the left sub-array
	            quickSort(arr, pi + 1, high); // Recursive call for the right sub-array
	        }
	    }

	    // Partition method to place the pivot element at its correct position
	    private static int partition(int[] arr, int low, int high) {
	        int pivot = arr[high]; // Choosing the last element as pivot
	        int i = low - 1; // Index of the smaller element

	        for (int j = low; j < high; j++) {
	            if (arr[j] < pivot) {
	                i++;
	                // Swap arr[i] and arr[j]
	                int temp = arr[i];
	                arr[i] = arr[j];
	                arr[j] = temp;
	            }
	        }

	        // Swap the pivot element with the element at i + 1
	        int temp = arr[i + 1];
	        arr[i + 1] = arr[high];
	        arr[high] = temp;

	        return i + 1; // Return the partition index
	    }

	    // Utility method to print the array
	    private static void printArray(int[] arr) {
	        for (int i : arr) {
	            System.out.print(i + " ");
	        }
	        System.out.println();
	    }

	    // Main method to test the Quick Sort algorithm
	    public static void main(String[] args) {
	        int[] arr = {10, 7, 8, 9, 1, 5};
	        System.out.println("Original array:");
	        printArray(arr);

	        quickSort(arr, 0, arr.length - 1);

	        System.out.println("Sorted array:");
	        printArray(arr);
	    }
	}


