package com.java.springboot.cruddemo.service;

import java.util.List;

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
	public void save(OrderItem theOrderItem) {
		orderItemRepository.save(theOrderItem);
	}

}
