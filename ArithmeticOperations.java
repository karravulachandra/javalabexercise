import java.util.Scanner;

public class ArithmeticOperations {

    // Parameterized function to perform arithmetic operations
    public static double performOperation(double num1, double num2, char operation) {
        double result = 0;

        switch (operation) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '*':
                result = num1 * num2;
                break;
            case '/':
                if (num2 != 0) {
                    result = num1 / num2;
                } else {
                    System.out.println("Error: Division by zero is not allowed.");
                }
                break;
            default:
                System.out.println("Error: Invalid operation.");
                break;
        }

        return result;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        // Prompt the user to enter two numbers
        System.out.print("Enter the first number: ");
        double num1 = scanner.nextDouble();

        System.out.print("Enter the second number: ");
        double num2 = scanner.nextDouble();

        // Prompt the user to enter the operation
        System.out.print("Enter the operation (+, -, *, /): ");
        char operation = scanner.next().charAt(0);

        // Call the performOperation function and display the result
        double result = performOperation(num1, num2, operation);

        if (operation == '+' || operation == '-' || operation == '*' || (operation == '/' && num2 != 0)) {
            System.out.println("The result of the operation is: " + result);
        }

        scanner.close();
    }
}
