package JC;
import java.util.Stack;

public class StackReversal {
	
	    // Method to insert an element at the bottom of the stack
	    public static void insertAtBottom(Stack<Integer> s, int item) {
	        // Base case: if the stack is empty, insert the given item at the bottom
	        if (s.empty()) {
	            s.push(item);
	            return;
	        }
	        // Pop all items from the stack and hold them in the call stack
	        int top = s.pop();
	        insertAtBottom(s, item);
	        // After the recursion unfolds, push each item in the call stack at the top of the stack
	        s.push(top);
	    }

	    // Recursive function to reverse a given stack
	    public static void reverseStack(Stack<Integer> s) {
	        // Base case: stack is empty
	        if (s.empty()) {
	            return;
	        }
	        // Pop all items from the stack and hold them in the call stack
	        int item = s.pop();
	        reverseStack(s);
	        // After the recursion unfolds, insert each item in the call stack at the bottom of the stack
	        insertAtBottom(s, item);
	    }

	    public static void main(String[] args) {
	        Stack<Integer> s = new Stack<>();
	        for (int i = 1; i <= 6; i++) {
	            s.push(i);
	        }
	        System.out.println("Original stack is " + s);
	        reverseStack(s);
	        System.out.println("Reversed stack is " + s);
	    }
	}


