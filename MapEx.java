package javalabexercise;
import java.util.*;
public class MapEx {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
       Map<Integer,String> map=new HashMap<>();
       map.put(1,"AAA");
       map.put(2,"BBB");
       map.put(3,"AAA");
       map.put(3,"CCC");
     /*  System.out.println(map);
       System.out.println(map.keySet());
       System.out.println(map.values());
       System.out.println(map.entrySet());*/
       System.out.println(map.get(2));
       map.remove(3);
       System.out.println(map);
       System.out.println(map.containsKey(3));
       System.out.println(map.containsValue("BBB"));
	}

}
