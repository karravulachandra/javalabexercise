package collections;
import java.util.*;

public class HashSetDemo {
public static void main(String Args[]) {
	HashSet<Integer> al=new HashSet<>();
	al.add(5);
	al.add(10);
	al.add(15);
	al.add(20);
	al.add(25);
	System.out.println(" Displaying "+ al);
	boolean conts = al.contains(10);
	System.out.println(conts);
	al.remove(15);
	System.out.println(al);
	int s=al.size();
	System.out.println(s);
}
}
