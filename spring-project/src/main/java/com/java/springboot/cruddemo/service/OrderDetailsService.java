package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.entity.OrderDetails;

public interface OrderDetailsService {
	
	public List<OrderDetails> findAll();
	
	public OrderDetails findById(int theId);
	
	public void save(OrderDetails theOrderDetails);
	
	public void deleteById(int theId);
	
	public OrderDetails findByEmail(String theEmail);
	
	public boolean checkEmailExists(String theEmail);
	
}
