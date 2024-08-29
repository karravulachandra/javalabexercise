
package day1;

import java.util.Scanner;

public class SimpleIf {
	
public static void main(String[] args) {
		
		try (Scanner sc = new Scanner(System.in)) {
			String isGraduated;
			  System.out.println("Are you a Graduate ? Yes/No");
			  isGraduated=sc.next();
			  if(isGraduated.equals("Yes"))
			  {
				  System.out.println("You are Eligible");
			  }
		}
	}
}
