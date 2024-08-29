package Threads;

public class RaceConditionExample {
	    private static int counter = 0;
	    public static void main(String[] args) throws InterruptedException {
	        Thread thread1 = new Thread(() -> {
	            for (int i = 0; i < 1000; i++) {
	                counter++;
	            }
	        });

	        Thread thread2 = new Thread(() -> {
	            for (int i = 0; i < 1000; i++) {
	                counter++;
	            }
	        });

	        // Start both threads
	        thread1.start();
	        thread2.start();

	        // Wait for both threads to complete
	        thread1.join();
	        thread2.join();

	        // Print the final value of counter
	        System.out.println("Final counter value: " + counter);
	    }
	}

