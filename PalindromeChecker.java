package JC;
import java.util.Stack;
public class PalindromeChecker {
	

	
	    public static boolean isPalindrome(String str) {
	        Stack<Character> stack = new Stack<>();
	        int length = str.length();
	        int mid = length / 2;

	        // Push first half of the string onto the stack
	        for (int i = 0; i < mid; i++) {
	            stack.push(str.charAt(i));
	        }
	        // Skip the middle character if the string length is odd
	        if (length % 2 != 0) {
	            mid++;
	        }
	        // Compare second half with the characters in the stack
	        for (int i = mid; i < length; i++) {
	            if (stack.isEmpty() || stack.pop() != str.charAt(i)) {
	                return false;
	            }
	        }
	        return true;
	    }
	    public static void main(String[] args) {
	        String test1 = "racecar";
	        String test2 = "hello";
	        System.out.println(test1 + " is palindrome: " + isPalindrome(test1));
	        System.out.println(test2 + " is palindrome: " + isPalindrome(test2));
	    }
}
