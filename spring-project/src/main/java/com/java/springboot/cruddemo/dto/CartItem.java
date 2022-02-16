package com.java.springboot.cruddemo.dto;

public class CartItem {
	public int amount;
	public double price;

	public CartItem() {
		
	}
	
	public CartItem(int amount, double price) {
		this.amount = amount;
		this.price = price;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}
	
	public double getTotal() {
		return this.amount * this.price;
	}
}
