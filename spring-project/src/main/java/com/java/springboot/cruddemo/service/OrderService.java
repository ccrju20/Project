package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.entity.Order;

public interface OrderService {
	
	public List<Order> findAll();
	
	public List<Order> findByAccountId(int id);
	
	public Order findById(int theId);
	
	public void save(Order theOrder);
	
	public void deleteById(int theId);
}
