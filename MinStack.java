package JC;
import java.util.Stack;
public class MinStack {
	    private Stack<Integer> mainStack;
	    private Stack<Integer> minStack;
	    public MinStack() {
	        mainStack = new Stack<>();
	        minStack = new Stack<>();
	    }
	    public void push(int x) {
	        mainStack.push(x);
	        if (minStack.isEmpty() || x <= minStack.peek()) {
	            minStack.push(x);
	        }
	    }
	    public void pop() {
	        if (!mainStack.isEmpty()) {
	            int popped = mainStack.pop();
	            if (popped == minStack.peek()) {
	                minStack.pop();
	            }
	        }
	    }
	    public int top() {
	        if (!mainStack.isEmpty()) {
	            return mainStack.peek();
	        }
	        throw new IllegalStateException("Stack is empty");
	    }
	    public boolean isEmpty() {
	        return mainStack.isEmpty();
	    }
	    public int getMin() {
	        if (!minStack.isEmpty()) {
	            return minStack.peek();
	        }
	        throw new IllegalStateException("Stack is empty");
	    }
	    public static void main(String[] args) {
	        MinStack stack = new MinStack();
	        stack.push(3);
	        stack.push(5);
	        stack.push(2);
	        stack.push(1);
	        System.out.println("Minimum: " + stack.getMin()); // Should print 1
	        stack.pop();
	        System.out.println("Minimum after pop: " + stack.getMin()); // Should print 2
	    }
}
