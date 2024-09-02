package Interface;

public interface Laptop {

	public void copy();
	public void paste();
	public void cut();
	default void security() {
		v();
		System.out.println("Security ");
	}
	static void audio(){
		v();
		System.out.println("Audio");
	}
	private static void v() {
		System.out.println("Private Mode");
	}
}
