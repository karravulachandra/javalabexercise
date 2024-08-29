package Collections;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
public class RemoveDupString {
	

	

	

		public static void main(String[] args) {
			List<String> stringList = new ArrayList<>();
	        stringList.add("ford");
	        stringList.add("mahindra");
	        stringList.add("kia");
	        stringList.add("audi");
	        stringList.add("ford");
	        stringList.add("kia");
	        List<String> uniqueStrings = stringList.stream()
	                                               .distinct()
	                                               .collect(Collectors.toList());
	        System.out.println("List without duplicates: " + uniqueStrings);
	    }
	}



