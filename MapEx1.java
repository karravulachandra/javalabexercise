package javalabexercise;
import java.util.*;
public class MapEx1 {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
       Map<Integer,String> map=new HashMap<>();
       map.put(1,"AAA");
       map.put(2,"BBB");
       map.put(3,"AAA");
       map.put(3,"CCC");
       System.out.println(map);
       System.out.println(map.keySet());
       System.out.println(map.values());
       System.out.println(map.entrySet());
       System.out.println("Value for the key 2:"+map.get(2));
       map.remove(3);
       System.out.println("After remove Key 3:"+map);
       System.out.println("Is map have key 3?:"+map.containsKey(3));
       System.out.println("Is map have Value BBB?:"+map.containsValue("BBB"));
       System.out.println("Is map have data?:"+map.isEmpty());
       System.out.println("Size:"+map.size());
       map.clear();
       System.out.println("After clear:"+map.size());
       System.out.println("Is map is empty after clear?:"+map.isEmpty());
	}

}