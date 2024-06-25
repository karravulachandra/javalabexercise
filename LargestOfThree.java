import java.util.Scanner;

public class LargestOfThree {

    // Parameterized function to find the largest of three numbers
    public static int findLargest(int num1, int num2, int num3) {
        int largest;

        if (num1 >= num2 && num1 >= num3) {
            largest = num1;
        } else if (num2 >= num1 && num2 >= num3) {
            largest = num2;
        } else {
            largest = num3;
        }

        return largest;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter three numbers
        System.out.print("Enter the first number: ");
        int num1 = scanner.nextInt();

        System.out.print("Enter the second number: ");
        int num2 = scanner.nextInt();

        System.out.print("Enter the third number: ");
        int num3 = scanner.nextInt();

        // Call the findLargest function and display the result
        int largest = findLargest(num1, num2, num3);
        System.out.println("The largest number is: " + largest);

        scanner.close();
    }
}
