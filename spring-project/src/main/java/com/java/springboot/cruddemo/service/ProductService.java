package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.entity.Product;

public interface ProductService {
	
	public List<Product> findAll();
	
	public Product findById(int theId);
	
	public void save(Product theProduct);
	
	public void deleteById(int theId);

}
