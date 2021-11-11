package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderItemRepository;
import com.java.springboot.cruddemo.entity.OrderItem;

@Service
public class OrderItemServiceImpl implements OrderItemService {
	
	@Qualifier("OrderItemRepository")
	private OrderItemRepository orderItemRepository;
	
	@Autowired
	public OrderItemServiceImpl(OrderItemRepository theOrderItemRepository) {
		orderItemRepository = theOrderItemRepository;
	}

	@Override
	public List<OrderItem> findAll() {
		return orderItemRepository.findAll();
	}
	
	@Override
	public OrderItem findById(int theId) {
		Optional<OrderItem> result = orderItemRepository.findById(theId);
		
		OrderItem theOrderItem = null;
		
		if (result.isPresent()) {
			theOrderItem = result.get();
		}
		else {
			// we didn't find the OrderItem
			throw new RuntimeException("Did not find OrderItem id - " + theId);
		}
		return theOrderItem;
	}


	@Override
	public void save(OrderItem theOrderItem) {
		orderItemRepository.save(theOrderItem);
	}

	@Override
	public void deleteById(int theId) {
		orderItemRepository.deleteById(theId);
	}


}
