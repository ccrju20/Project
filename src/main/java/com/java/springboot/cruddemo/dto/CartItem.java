package com.java.springboot.cruddemo.dto;

import java.math.BigDecimal;

public class CartItem {
	public int amount;
	public BigDecimal price;

	public CartItem() {
		
	}
	
	public CartItem(int amount, BigDecimal price) {
		this.amount = amount;
		this.price = price;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	
	public BigDecimal getTotal() {
		return new BigDecimal(this.amount).multiply(this.price);
	}
}
