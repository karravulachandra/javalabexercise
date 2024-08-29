package Strings;
import java.text.NumberFormat;
import java.util.Locale;
public class CurrencyFormatter {
		    public static void main(String[] args) {
	        double number = 123456.78;

	        NumberFormat indianFormat = NumberFormat.getCurrencyInstance(new Locale("en", "IN"));
	        String indianCurrency = indianFormat.format(number);
	        System.out.println("Indian format: " + indianCurrency);

	        NumberFormat koreanFormat = NumberFormat.getCurrencyInstance(Locale.KOREA);
	        String koreanCurrency = koreanFormat.format(number);
	        System.out.println("Korean format: " + koreanCurrency);
	    }
	}