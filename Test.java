/**
 * 
 */
package Package;

/**
 * @author karra
 *
 */
public class Test {

	/**
	 * 
	 */
	int a;
	int b;
	public Test() {
		// TODO Auto-generated constructor stub
		a=10;
		b=10;
	}
	public Test(int a,int b) {
		this.a=a;
		this.b=b;
		}
	
	public static void main(String[] args) {
		Test t=new Test();
		Test t1=new Test(19,20);
		System.out.println(t.add());
		System.out.println(t1.add());
		System.out.println(t==t);

	}
	public int add() {
		return a+b;
	}

}
