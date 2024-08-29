package exception;
import java.util.*;
public class SetEx {
	public static void main(String[] args) {
		// TODO Auto-generated method stub
        Set<String> s=new HashSet<>();
	 	Set<String> s11=new TreeSet<>();
	 	Set<String> s22=new LinkedHashSet<>();
      s.add("Dog");
      s.add("Cat");
      s.add("Rat");
      s.add("Dog");
      System.out.println(s);
      s.remove("Rat");
      System.out.println(s);
      System.out.println(s.isEmpty()+" "+s.size());
      s.clear();
      System.out.println(s.isEmpty()+" "+s.size());
      Set<Integer> s1=new HashSet<>(Arrays.asList(1,3,5,0));
      Set<Integer> s2=new HashSet<>(Arrays.asList(2,4,6,0));
      Set<Integer> s3=new HashSet<>(Arrays.asList(3,5));
      s1.addAll(s2);//Union
      s1.removeAll(s2);//Difference
      s1.retainAll(s2);//Intersection
      System.out.println(s1+" "+s2);
      boolean res=s1.containsAll(s3);
      System.out.println(res);
      
	}

}