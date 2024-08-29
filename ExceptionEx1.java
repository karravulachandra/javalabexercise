package exception;
import java.util.*;
public class ExceptionEx1 {


	public static void main(String[] args) {
        int a,b,c=0;
		try
		{
			Scanner sc=new Scanner(System.in);
			System.out.println("Enter 2 nums:");
			a=sc.nextInt();
			b=sc.nextInt();
			c=a/b;
		}
	/*	catch(InputMismatchException e)
		{
			System.out.println("Wrong input");
		}
		catch(ArithmeticException e1)
		{
			System.out.println(e1.getMessage());
		}
		catch(Exception e2)
		{
			System.out.println(e2.getMessage());
		}*/
		catch(InputMismatchException | ArithmeticException  e)
		{
			System.out.println(e.getMessage());
		}
		catch (Exception e) {
			System.out.println(e.getMessage());
		}
		finally
		{
        System.out.println(c);
		}
	}

}