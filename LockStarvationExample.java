package Threads;

public class LockStarvationExample {
	    private static final Object lock = new Object();
	    private static int sharedResource = 0;
 
	    public static void main(String[] args) {
	        // Create 5 threads that access the shared resource
	        for (int i = 0; i < 5; i++) {
	            Thread thread = new Thread(() -> {
	                while (true) {
	                    synchronized (lock) {
	                        // Critical section
	                        sharedResource++;
	                        System.out.println(Thread.currentThread().getName() + ": Shared resource incremented to " + sharedResource);
	                    }
	                }
	            });
	            thread.start();
	        }
	 }
}
