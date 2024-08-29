package Strings;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class lab13 {
		public static void main(String[] args) {
			LocalDate today=LocalDate.now();
			System.out.println("Today's date is :"+today);
			LocalDate oneWeek=today.plusWeeks(1);
			System.out.println("Next week :"+oneWeek);
			DateTimeFormatter dtf=DateTimeFormatter.ofPattern("dd-MMM-yyy");
			String res=today.format(dtf);
			System.out.println(res);
		}

	}
