package com.java.springboot.cruddemo.dto;

import com.google.gson.annotations.SerializedName;

public class CreatePayment {

	@SerializedName("items")
	CartItem[] items;
	
	public CreatePayment() {
	}

	public CreatePayment(CartItem[] cartItems) {
		this.items = cartItems;
	}

	public CartItem[] getItems() {
		return items;
	}
}