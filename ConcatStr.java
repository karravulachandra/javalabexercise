package Collections;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
public class ConcatStr {
	

	

			public static void main(String[] args) {
	            List<String> stringList = new ArrayList<>();
	            stringList.add("Good");
	            stringList.add("Morning");
	            stringList.add("Good");
	            stringList.add("Afternoon");
	            stringList.add("Good Evening");
	            String concatenatedString = stringList.stream()
	                                                  .collect(Collectors.joining(" "));
	            System.out.println("joined String is: " + concatenatedString);
		}

	}

