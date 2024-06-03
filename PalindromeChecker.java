public class PalindromeChecker {

    public static boolean isPalindrome(String str) {
        
        String cleanedStr = str.replaceAll("\\s+", "").toLowerCase();
        int left = 0;
        int right = cleanedStr.length() - 1;
        while (left < right) {
            if (cleanedStr.charAt(left) != cleanedStr.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }

    public static void main(String[] args) {
     
        String[] testStrings = {
            "A man a plan a canal Panama",
            "racecar",
            "hello",
            "Was it a car or a cat I saw",
            "No 'x' in Nixon"
        };

        
        for (String testString : testStrings) {
            System.out.println("\"" + testString + "\" is a palindrome? " + isPalindrome(testString));
        }
    }
}
