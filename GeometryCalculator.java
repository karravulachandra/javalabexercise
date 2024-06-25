class GeometryCalculator {

    // Method to calculate the area of a circle
    public double calculateArea(double radius) {
        return Math.PI * radius * radius;
    }

    // Method to calculate the area of a rectangle
    public double calculateArea(double length, double width) {
        return length * width;
    }

    // Method to calculate the area of a triangle
    public double calculateArea(double base, double height, boolean isTriangle) {
        if (isTriangle) {
            return 0.5 * base * height;
        }
        return 0;  // This branch won't be used if isTriangle is always true for triangles
    }

    public static void main(String[] args) {
        GeometryCalculator calculator = new GeometryCalculator();

        // Calculate the area of a circle
        double circleArea = calculator.calculateArea(5.0);
        System.out.println("Area of the circle: " + circleArea);

        // Calculate the area of a rectangle
        double rectangleArea = calculator.calculateArea(4.0, 6.0);
        System.out.println("Area of the rectangle: " + rectangleArea);

        // Calculate the area of a triangle
        double triangleArea = calculator.calculateArea(3.0, 4.0, true);
        System.out.println("Area of the triangle: " + triangleArea);
    }
}
