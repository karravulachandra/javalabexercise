package javalabexercise;

public class GeometryCalculator {
	 // Method to calculate the area of a circle
    public static double calculateArea(double radius) {
        return Math.PI * radius * radius;
    }

    // Method to calculate the area of a rectangle
    public static double calculateArea(double length, double width) {
        return length * width;
    }

    // Method to calculate the area of a triangle
    public static double calculateArea(double base, double height, boolean isTriangle) {
        if (isTriangle) {
            return 0.5 * base * height;
        }
        else {
        	  return 0.0; // This else block is just a placeholder, you might have other logic here

        }
    }
    public static void main(String[] args) {
    	
    	 // Calculate the area of a circle
    	double circleArea = calculateArea(4.0);
    	System.out.println("Area of circle:"+circleArea);
    	
    	 // Calculate the area of a rectangle
    	double rectangleArea = calculateArea(5.0,7.0);
    	System.out.println("Area of rectangle:"+rectangleArea);
    	
    	 // Calculate the area of a triangle
    	double triangleArea = calculateArea(3.0,5.0,true);
    	System.out.println("Area of triangle:"+triangleArea);
    }
}