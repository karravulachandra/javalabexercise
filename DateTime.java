import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTime {
static public void GetDateAndTime() {
	DateFormat dateFormat = new 
			SimpleDateFormat("MM/dd/yyyy HH:mm");
	Date date = new Date();
	System.out.println(dateFormat.format(date));
}
}
