package collections;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.Collections;
public class Diffica {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
		String[] ar= new String[]{"w","e", "l", "c", "o", "m", "e"};
		for(int i=0;i<ar.length;i++) {
			System.out.println(ar[i]);
		}
		System.out.println();
		ArrayList<String> al=new ArrayList<>();
		al.add("a");
		al.add("d");
		al.add(2,"money");
		al.set(1,"hui");
		System.out.println(al);
		al.remove(1);
		System.out.println(al.lastIndexOf(al));
		Collections.sort(al);
		System.out.println(al);
		Iterator<String> itr=al.iterator();
		while(itr.hasNext()) {
			System.out.print(itr.next());
		}
	}
}
