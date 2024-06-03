package day1;

public class NestedIfEx {

	public static void main(String[] args) {
		int x = 10;
		int y = 5;
		int z = 8;

		if (x > 5) 
		{
		    System.out.println("x is greater than 5");
		    if (y > 2) 
		    {
		        System.out.println("y is greater than 2");
		        if (z < 10) 
		        {
		            System.out.println("z is less than 10");
		        }
		    }
		}


	}
}
