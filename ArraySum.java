package day1;
import java.util.Scanner;
public class ArraySum {

	public static void main(String[] args) {
		try (// TODO Auto-generated method stub
		Scanner sc = new Scanner(System.in)) {
			int[] arr=new int[3];
			for(int i=0;i<3;i++) {
				arr[i]=sc.nextInt();
			}
			int sum=0;
			for(int i=0;i<3;i++) {
				sum+=arr[i];
			}
			System.out.println(sum);
		}
	}

}
