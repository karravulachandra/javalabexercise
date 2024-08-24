package JC;
import java.sql.*;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
public class abc {
	public static void main(String[] args) throws ClassNotFoundException,SQLException {
		// TODO Auto-generated method stub
		Connection con=null;
		ResultSet st=null;
		PreparedStatement stmt=null;
		Class.forName("com.mysql.cj.jdbc.Driver");
          con = DriverManager.getConnection("jdbc:mysql://localhost:3306/chandra", "root", "Karravula2001@@");
          System.out.println("Successfully Connected");
          String insertQuery = "INSERT INTO emp VALUES ('Ma', 25, 45000)";
          stmt = con.prepareStatement(insertQuery);
          //int rowsInserted = stmt.executeUpdate();
          st = stmt.executeQuery("SELECT * FROM emp");
			while(st.next()){
				System.out.println(st.getString(1)+" "+st.getInt(2)+" "+st.getInt(3));
			}
}
}