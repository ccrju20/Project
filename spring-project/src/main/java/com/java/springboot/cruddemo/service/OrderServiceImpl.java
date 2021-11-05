package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderRepository;
import com.java.springboot.cruddemo.entity.Order;

@Service
public class OrderServiceImpl implements OrderService {
	
	private OrderRepository OrderRepository;
	
	@Autowired
	public OrderServiceImpl(OrderRepository theOrderRepository) {
		OrderRepository = theOrderRepository;
	}

	@Override
	public List<Order> findAll() {
		return OrderRepository.findAll();
	}

	@Override
	public Order findById(int theId) {
		Optional<Order> result = OrderRepository.findById(theId);
		
		Order theOrder = null;
		
		if (result.isPresent()) {
			theOrder = result.get();
		}
		else {
			// we didn't find the Order
			throw new RuntimeException("Did not find Order id - " + theId);
		}
		return theOrder;
	}

	@Override
	public void save(Order theOrder) {
		OrderRepository.save(theOrder);
	}

	@Override
	public void deleteById(int theId) {
		OrderRepository.deleteById(theId);
	}

}
