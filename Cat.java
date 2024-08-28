package Package;
public class Cat {
	public int c1;
	Cat(){
		c1=20;
		System.out.println("Constructor Created");
	}
	public Cat(int b){
		System.out.println(b);
	}
	public static void main(String[] args) {
		// TODO Auto-generated method stub
		Cat c=new Cat();
		System.out.println(c.c1);
		Cat f=new Cat();
		System.out.print(f.c1);
		System.out.print("Hello");
		System.out.println("Hello");
		System.out.printf("hello arun bagunnara %d\n",303);
		System.err.println("Hello world");
		//%b-boolean,%c -char,%d-int,%e-scientific exponential,%f-float,%s-string,%tc-complete date and time,%n-new line,%%-% printing;
	}
}
