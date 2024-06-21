package inheritance;
abstract class Employee
{
	private String name;
	private int id;
	private double salary;
	
	public Employee(String name, int id,double salary) 
	{
		this.name = name;
		this.salary = salary;
	    this.id = id;
	}
	public abstract double cal_bonus();
	public void dis_emp()
	{
		System.out.println("Name: "+name);
		System.out.println("Id: "+id);
		System.out.println("Salary: "+salary);
		System.out.println("Bonus: "+cal_bonus());
	}
	public double getSalary() {
		return salary;
	}
	
}
class Manager extends Employee
{
	private double bonus_per;

	public Manager(String name, int id, double salary,double bonus_per) {
		super(name, id, salary);
		this.bonus_per=bonus_per;
	}

	@Override
	public double cal_bonus() {
		// TODO Auto-generated method stub
		return getSalary()*(bonus_per/100);
	}
	
}
class Developer extends Employee
{
	private String pgmLan;
	public Developer(String name, int id, double salary,String pgmLan) {
		super(name, id, salary);
		this.pgmLan=pgmLan;
		// TODO Auto-generated constructor stub
	}
	@Override
	public double cal_bonus() {
		if(pgmLan.equalsIgnoreCase("Java"))
		{
		return 1000;
		}
		else if(pgmLan.equalsIgnoreCase("Python"))
		{
			return 700;
		}
		else
		{
			return 500;
		}
	}
	
}
public class AbsEx {

	public static void main(String[] args) {
		Manager m1=new Manager("Abcd", 1, 60000, 10);
		Developer d1=new Developer("hh", 2, 55000, "Java");
		Developer d2=new Developer("yugy", 3, 50000, "python");
		Developer d3=new Developer("dd", 4, 60000, ".Net");
		System.out.println("Manager\n-------");
		m1.dis_emp();
		System.out.println("Developer\n---------");
		d1.dis_emp();
		d2.dis_emp();
		d3.dis_emp();

	}

}
