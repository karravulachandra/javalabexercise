import java.util.Scanner;

public class FibonacciSeries1 {

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        
        System.out.print("Enter the number of terms: ");
        int numTerms = scanner.nextInt();
        
        // Generate the Fibonacci series
        int a = 0, b = 1;
        
        System.out.print("Fibonacci series up to " + numTerms + " terms: ");
        
        for (int i = 1; i <= numTerms; i++) {
            System.out.print(a + " ");
            int nextTerm = a + b;
            a = b;
            b = nextTerm;
        }
        
        scanner.close();
    }
}
