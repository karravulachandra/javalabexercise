package Collections;
import java.util.*;
public class StackEx3 {
	class StackArrList<T>
	{
		private ArrayList<T> list=new ArrayList<>();
		public void push(T item)
		{
			list.add(item);
		}
		public T pop()
		{
			if(isEmpty())
			{
				throw new EmptyStackException();
			}
			int lastIndex=list.size()-1;
			T item=list.get(lastIndex);
			list.remove(item);
			return item;
		}
		public boolean isEmpty() {
			// TODO Auto-generated method stub
			return list.isEmpty();
		}
		public T peek()
		{
			if(isEmpty())
			{
				throw new EmptyStackException();
			}
			return list.get(list.size()-1);
		}
		public int size()
		{
			return list.size();
		}
		public void clear()
		{
			list.clear();
		}
	}
	

		public static void main(String[] args) {
			StackArrList<Integer> sa=new StackArrList<>();
			sa.push(3);
			sa.push(6);
			sa.push(9);
			sa.push(12);
			sa.push(15);
			System.out.println("Top:"+sa.peek());
			System.out.println("Size:"+sa.size());
			System.out.println("Check:"+sa.isEmpty());
			System.out.println("Removed:"+sa.pop());
			System.out.println("Top:"+sa.peek());
			System.out.println("Size:"+sa.size());
			System.out.println("Clearing all:");
			sa.clear();
			System.out.println("Size:"+sa.size());
			System.out.println("Check:"+sa.isEmpty());
		}
	}
	

