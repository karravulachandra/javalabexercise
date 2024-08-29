package javalabexercise;

import java.util.*;

public class SortEx {

	public static void main(String[] args) {
        
		List<Integer> list = new ArrayList<>(Arrays.asList(34,21,89,54,10,4,100));
		System.out.println("Before Sorting:");
		System.out.println(list);
		System.out.println("After Sorting(Asc):");
		Collections.sort(list);
		System.out.println(list);
		System.out.println("After Sorting(Desc):");
		Collections.reverse(list);
		System.out.println(list);
	}

}