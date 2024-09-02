package Interface;

public class Lenovo implements Laptop{

	@Override
	public void copy() {
		// TODO Auto-generated method stub
		System.out.println("Copy code lenovo");
		
	}

	@Override
	public void paste() {
		// TODO Auto-generated method stub
		System.out.println("Paste code lenovo");

		
	}

	@Override
	public void cut() {
		// TODO Auto-generated method stub
		System.out.println("Cut code lenovo");

	}
	public void Camera() {
		System.out.println("Camera code Lenovo");

		
	}
	@Override
	public void security() {
		System.out.println("Lenovo Security");
	}

}
