package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.entity.OrderItem;

public interface OrderItemService {
	
	public List<OrderItem> findAll();
	
	public void save(OrderItem theOrderItem);

}
