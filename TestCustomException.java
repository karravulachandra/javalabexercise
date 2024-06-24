package exception;

public class TestCustomException {

	public static void main(String[] args) {
		// TODO Auto-generated method stub
     Bank b =new Bank("12345",1000);
     try
     {
     b.withdraw(1500);
     }
     catch(Exception e)
     {
    	 System.out.println(e.getMessage());
		/*MobileRecharge mb=new MobileRecharge(0);
		try {
		mb.call();
		}
		catch (InsufficientBalanceException e) {
			System.out.println(e.getLocalizedMessage());
			// TODO: handle exception
		}
		*/
     }
	}
}
