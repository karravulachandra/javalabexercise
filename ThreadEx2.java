
package Threads;

public class ThreadEx2 implements Runnable {

	public static void main(String[] args) {
     ThreadEx2 t=new ThreadEx2();
     ThreadEx1 th1=new ThreadEx1();
     th1.start();
     Thread th=new Thread(t);
     th.start();
	}
	@Override
	public void run() {
		System.out.println("Thread starts");
	}

}