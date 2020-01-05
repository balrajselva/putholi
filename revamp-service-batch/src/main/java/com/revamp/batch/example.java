package com.revamp.batch;

public class example {

	public static void main(String[] args) {
		int num=5;
		int i=1;
		int temp=5;
		while(i<100){
			System.out.println(i);
			if(i==num){
				i=i+temp;
				num=i+temp;
				temp++;
				i--;
			}
			i++;
		}
	}

}
