package Strings;
import java.time.LocalDate;
import java.time.Month;
public class IndependenceDay {
	    public static void main(String[] args) {
	        LocalDate today = LocalDate.now();
	        LocalDate independenceDay = LocalDate.of(today.getYear(), Month.AUGUST, 15);

	        if (today.isBefore(independenceDay)) {
	            System.out.println("Independence day is yet to come this year.");
	        } else if (today.isEqual(independenceDay)) {
	            System.out.println("Today is Independence day!");
	        } else {
	            System.out.println("Independence day was already celebrated this year.");
	        }
	    }
	}
