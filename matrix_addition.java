package day1;

import java.util.Scanner;

public class matrix_addition {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int arr[][]=new int[3][3];
		int arr2[][]=new int[3][3];
		try (Scanner sc = new Scanner(System.in)) {
			for(int i=0;i<3;i++) {
				for(int j=0;j<3;j++) {
					//input from user.
					arr[i][j]=sc.nextInt();
				}
			}
			for(int i=0;i<3;i++) {
				for(int j=0;j<3;j++) {
					// input from user.
					arr2[i][j]=sc.nextInt();
				}
			}
		}
		int result[][]=new int[3][3];
      for(int i=0;i<3;i++) {
    	  for(int j=0;j<3;j++) {
    		  //addition of two matrix, storing it in another 2d array.
    		  result[i][j]=arr[i][j]+arr2[i][j];
    	  }
      }
      for(int i=0;i<3;i++) {
    	  for(int j=0;j<3;j++) {
    		  //sum of two matrix printing.
    		  System.out.print(result[i][j]+" ");
    	  }
    	  System.out.println(" ");
      }
	}
}
