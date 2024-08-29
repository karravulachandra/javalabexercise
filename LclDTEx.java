package Strings;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
public class LclDTEx {
		public static void main(String[] args) {
			LocalDate today=LocalDate.now();
			System.out.println("Today's date is :"+today);
			LocalDate oneWeek=today.plusWeeks(1);
			System.out.println("Next week :"+oneWeek);
			DateTimeFormatter dtf=DateTimeFormatter.ofPattern("dd-MMM-yyy");
			String res=today.format(dtf);
			System.out.println(res);
			
			LocalTime currentTime = LocalTime.now();
			System.out.println("Current time: " + currentTime);
			// Create a LocalTime object with specific hour, minute, and secondvalues
			LocalTime specificTime = LocalTime.of(12, 30, 45);
			System.out.println("Specific time: " + specificTime);
			// Perform operations on LocalTime objects
			LocalTime plusTwoHours = currentTime.plusHours(2);
			LocalTime minusTenMinutes = currentTime.minusMinutes(10);
			System.out.println("Current time plus two hour: " + plusTwoHours);
			System.out.println("Current time minus ten minutes: " + minusTenMinutes);
			// Format the time using a specific pattern
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("hh:mm:ss a");
			String formattedTime = currentTime.format(formatter);
			System.out.println("Formatted time: " + formattedTime);
			
			// Create a LocalDateTime object representing current date and time
			LocalDateTime now = LocalDateTime.now();
			System.out.println("Current date and time: " + now);
			// Format the date and time using a specific pattern
			DateTimeFormatter formatter1 = DateTimeFormatter.ofPattern("dd-MM-yyyy  HH:mm:ss");
			String formattedDateTime = now.format(formatter1);
			System.out.println("Formatted date and time: " + formattedDateTime);
		}

	}
