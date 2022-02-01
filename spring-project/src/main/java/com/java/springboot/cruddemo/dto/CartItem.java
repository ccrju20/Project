package com.java.springboot.cruddemo.dto;

public class CartItem {
	public int amount;
	public int price;
	
	public CartItem(int amount, int price) {
		this.amount = amount;
		this.price = price;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
}
