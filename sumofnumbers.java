package Arrays;
import java.util.Scanner;
public class sumofnumbers {
	public static void main(String args[]) {
		
	
int ar[]=new int[7];
int sum=0;
try (Scanner sc = new Scanner(System.in)) {
	System.out.println("enter values");
	for(int i=0;i<ar.length;i++) {
		ar[i]=sc.nextInt();
		sum=sum+ar[i];
	}
	System.out.println(sum+"sum of given array values");
}
}
}