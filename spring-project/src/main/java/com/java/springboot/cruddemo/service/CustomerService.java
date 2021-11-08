package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.entity.Customer;

public interface CustomerService {
	
	public List<Customer> findAll();
	
	public Customer findById(int theId);
	
	public void save(Customer theCustomer);
	
	public void deleteById(int theId);
	
	public Customer findByEmail(String theEmail);
	
	public boolean checkEmailExists(String theEmail);
	
//	public int findIdByEmail(String theEmail);
}
