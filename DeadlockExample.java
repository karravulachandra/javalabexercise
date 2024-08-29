package Threads;

public class DeadlockExample {
	    private static Object resource1 = new Object();
	    private static Object resource2 = new Object();

	    public static void main(String[] args) {
	        // Thread 1 tries to lock resource1 then resource2
	        Thread thread1 = new Thread(() -> {
	            synchronized (resource1) {
	                System.out.println("Thread 1: Holding resource 1...");
	                try {
	                    Thread.sleep(100); // Introducing delay to exacerbate deadlock
	                } catch (InterruptedException e) {
	                    e.printStackTrace();
	                }

	                System.out.println("Thread 1: Waiting for resource 2...");
	                synchronized (resource2) {
	                    System.out.println("Thread 1: Holding resource 1 and resource 2...");
	                }
	            }
	        });

	        // Thread 2 tries to lock resource2 then resource1
	        Thread thread2 = new Thread(() -> {
	            synchronized (resource2) {
	                System.out.println("Thread 2: Holding resource 2...");

	                try {
	                    Thread.sleep(100); // Introducing delay to exacerbate deadlock
	                } catch (InterruptedException e) {
	                    e.printStackTrace();
	                }

	                System.out.println("Thread 2: Waiting for resource 1...");
	                synchronized (resource1) {
	                    System.out.println("Thread 2: Holding resource 2 and resource 1...");
	                }
	            }
	        });

	        // Start both threads
	        thread1.start();
	        thread2.start();
	    }
	}

