package Package;

public class Dog {
	public String breed="German Shepard";
	public int height=30;
	public int weight = 35;
	public static void main(String[] args) {
		Dog g=new Dog();
		System.out.println(g.height+g.breed+g.weight);
		System.out.println(g.breed);
		System.out.println(g.hashCode());
	}
}
