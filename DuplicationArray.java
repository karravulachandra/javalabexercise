package day1;

public class DuplicationArray {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		int[] array = {1, 2, 3, 4, 5, 6, 2, 3};
		for(int i=0;i<array.length;i++) {
			for(int j=i+1;j<array.length;j++) {
				if(array[i]!=array[j]) {
					System.out.println(array[i]);
				}
			}
		}

	}

}
