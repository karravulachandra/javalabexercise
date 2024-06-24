package exception;
	public class MobileRecharge {
	 
		int rc;
		public MobileRecharge(int rc)
		{
			this.rc=rc;
		}
		void call() throws InsufficientBalanceException
		{
			if(rc>0)
			{
				System.out.println("call connected");
			}
			else
			{
				throw new InsufficientBalanceException("need to recharge");
			}
		}
	}
}
