package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderRepository;
import com.java.springboot.cruddemo.entity.Order;

@Service
public class OrderService{
	
	private OrderRepository OrderRepository;
	
	@Autowired
	public OrderService(OrderRepository theOrderRepository) {
		OrderRepository = theOrderRepository;
	}

	public List<Order> findAll() {
		return OrderRepository.findAll();
	}

	public Order findById(int theId) {
		Optional<Order> result = OrderRepository.findById(theId);
		
		Order theOrder = null;
		
		if (result.isPresent()) {
			theOrder = result.get();
		}
		else {
			throw new RuntimeException("Did not find Order id - " + theId);
		}
		return theOrder;
	}

	public void save(Order theOrder) {
		OrderRepository.save(theOrder);
	}

	public void deleteById(int theId) {
		OrderRepository.deleteById(theId);
	}

	public List<Order> findByAccountId(int id) {
		List<Order> result =  OrderRepository.findByAccountId(id);
		return result;
	}

}
