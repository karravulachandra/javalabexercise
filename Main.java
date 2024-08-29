package day1;
	public class Main {
	    static class Nested {
	        void display() {
	            System.out.println("Static Nested Class");
	        }
	    }
	
	    public static void main(String[] args) {
	        Main.Nested nestedObj = new Main.Nested();
	        nestedObj.display();
	    }
	}

