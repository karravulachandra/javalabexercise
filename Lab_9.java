package javalabexercise;

public class Lab_9 {
	
	abstract class Shape {
	    
	    public abstract double calculateArea();
	    public void display() {
	        System.out.println("Displaying shape");
	    }
	}
	class Circle extends Shape {
	    private double radius;

	   
	    public Circle(double radius) {
	        this.radius = radius;
	    }


	    //Override
	    public double calculateArea() {
	        return Math.PI * radius * radius;
	    }

	    public double getRadius() {
	        return radius;
	    }
	}
	class Rectangle extends Shape {
	    private double width;
	    private double height;

	  
	    public Rectangle(double width, double height) {
	        this.width = width;
	        this.height = height;
	    }

	  
	    //Override
	    public double calculateArea() {
	        return width * height;
	    }
	    public double getWidth() {
	        return width;
	    }

	    public double getHeight() {
	        return height;
	    }
	}
	public class Lab_9 {
	    public static void main(String[] args) {

	        Shape circlearea = new Circle(7.0);
	        Shape rectanglearea = new Rectangle(2.0, 8.0);

	       
	        circlearea.display();
	        System.out.println("Area of the circle: " + circlearea.calculateArea());

	        rectanglearea.display();
	        System.out.println("Area of the rectangle: " + rectanglearea.calculateArea());
	    }
	}
}
