import java.util.Scanner;

public class SumOfArrayElements {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter the size of the array
        System.out.print("Enter the number of elements in the array: ");
        int size = scanner.nextInt();

        // Create an array of the given size
        int[] array = new int[size];

        // Prompt the user to enter the elements of the array
        System.out.println("Enter the elements of the array:");
        for (int i = 0; i < size; i++) {
            array[i] = scanner.nextInt();
        }

        // Calculate the sum of all elements in the array
        int sum = 0;
        for (int i = 0; i < size; i++) {
            sum += array[i];
        }

        // Display the sum of all elements
        System.out.println("The sum of all elements in the array is: " + sum);

        scanner.close();
    }
}
