package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderDetailsRepository;
import com.java.springboot.cruddemo.entity.OrderDetails;

@Service
public class OrderDetailsServiceImpl implements OrderDetailsService {
	
	private OrderDetailsRepository OrderDetailsRepository;
	
	@Autowired
	public OrderDetailsServiceImpl(OrderDetailsRepository theOrderDetailsRepository) {
		OrderDetailsRepository = theOrderDetailsRepository;
	}

	@Override
	public List<OrderDetails> findAll() {
		return OrderDetailsRepository.findAll();
	}

	@Override
	public OrderDetails findById(int theId) {
		Optional<OrderDetails> result = OrderDetailsRepository.findById(theId);
		
		OrderDetails theOrderDetails = null;
		
		if (result.isPresent()) {
			theOrderDetails = result.get();
		}
		else {
			// we didn't find the OrderDetails
			throw new RuntimeException("Did not find OrderDetails id - " + theId);
		}
		return theOrderDetails;
	}

	@Override
	public void save(OrderDetails theOrderDetails) {
		OrderDetailsRepository.save(theOrderDetails);
	}

	@Override
	public void deleteById(int theId) {
		OrderDetailsRepository.deleteById(theId);
	}

	@Override
	public OrderDetails findByEmail(String theEmail) {
		OrderDetails result = OrderDetailsRepository.findByEmail(theEmail);

		if (result == null) {
			throw new RuntimeException("Did not find OrderDetails email- " + theEmail);
		}
		
		return result;
	}
	
	@Override
	public boolean checkEmailExists(String theEmail) {
		OrderDetails result = OrderDetailsRepository.findByEmail(theEmail);
		
		if (result == null) {
			return false;
		}
		
		return true;
	}

}
