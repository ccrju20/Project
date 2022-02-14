package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderItemRepository;
import com.java.springboot.cruddemo.entity.OrderItem;

@Service
public class OrderItemService {
	
	@Qualifier("OrderItemRepository")
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	public OrderItemService(OrderItemRepository theOrderItemRepository) {
		orderItemRepository = theOrderItemRepository;
	}

	public List<OrderItem> findAll() {
		return orderItemRepository.findAll();
	}
	
	public OrderItem findById(int theId) {
		Optional<OrderItem> result = orderItemRepository.findById(theId);
		
		OrderItem theOrderItem = null;
		
		if (result.isPresent()) {
			theOrderItem = result.get();
		}
		else {
			throw new RuntimeException("Did not find OrderItem id - " + theId);
		}
		return theOrderItem;
	}

	public void save(OrderItem theOrderItem) {
		orderItemRepository.save(theOrderItem);
	}

	public void deleteById(int theId) {
		orderItemRepository.deleteById(theId);
	}


}
