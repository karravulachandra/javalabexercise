package JC;
import java.sql.*;
import java.util.Scanner;
		public class JDBCEx1 {
			public static void main(String[] args) throws ClassNotFoundException, SQLException {
				int Empno,sal;
			    String Emp;
			    try (Scanner sc = new Scanner(System.in)) {
					System.out.println("Enter name");
					Emp=sc.nextLine();
					System.out.println("Enter id");
					Empno=sc.nextInt();
					System.out.println("Enter sal");
					sal=sc.nextInt();
				}
			    Class.forName("com.mysql.cj.jdbc.Driver");
		        Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/chandra", "root", "Karravula2001@@");
		       // PreparedStatement ps = con.prepareStatement("Insert into students values(4,'dd',75838743,'gfd')");
		      //  PreparedStatement ps = con.prepareStatement("insert into students values(?,?,?,?)");
		        PreparedStatement ps = con.prepareStatement("insert into emp values('"+Emp+"',"+Empno+","+sal+")");
		      /*  ps.setInt(1, id);
		        ps.setString(2, name);
		        ps.setInt(3, mobile);
		        ps.setString(4, email);*/
		        int a = ps.executeUpdate();
		        
		        if(a>0)
		        {
		        	System.out.println("Successfully inserted");
		        }
		        else
		        {
		        	System.out.println("Technical error...");
		        }
		        ResultSet st=null;
		        st = ps.executeQuery("SELECT * FROM emp");
				while(st.next()){
					System.out.println(st.getString(1)+" "+st.getInt(2)+" "+st.getInt(3));
				}
			}

		}

	
		
