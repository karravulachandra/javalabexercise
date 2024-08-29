package day1;

public class PalindromCheck {

	    // Method to check if a string is a palindrome
	    public static boolean isPalindrome(String str) {
	        // Remove non-alphanumeric characters and convert to lowercase
	        String cleanedStr = str.replaceAll("[^a-zA-Z0-9]", "").toLowerCase();
	        
	        // Get the reverse of the cleaned string
	        String reversedStr = new StringBuilder(cleanedStr).reverse().toString();
	        
	        // Check if the cleaned string is equal to its reverse
	        return cleanedStr.equals(reversedStr);
	    }

	    public static void main(String[] args) {
	        String testString = "A man, a plan, a canal, Panama"; // Example string to check

	        if (isPalindrome(testString)) {
	            System.out.println("\"" + testString + "\" is a palindrome.");
	        } else {
	            System.out.println("\"" + testString + "\" is not a palindrome.");
	        }
	    }
	}


