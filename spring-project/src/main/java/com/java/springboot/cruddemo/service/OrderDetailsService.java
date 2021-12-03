package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderDetailsRepository;
import com.java.springboot.cruddemo.entity.OrderDetails;

@Service
public class OrderDetailsService {
	
	private OrderDetailsRepository OrderDetailsRepository;
	
	@Autowired
	public OrderDetailsService(OrderDetailsRepository theOrderDetailsRepository) {
		OrderDetailsRepository = theOrderDetailsRepository;
	}

	public List<OrderDetails> findAll() {
		return OrderDetailsRepository.findAll();
	}

//	public OrderDetails findById(int theId) {
//		Optional<OrderDetails> result = OrderDetailsRepository.findById(theId);
//		
//		OrderDetails theOrderDetails = null;
//		
//		if (result.isPresent()) {
//			theOrderDetails = result.get();
//		}
//		else {
//			throw new RuntimeException("Did not find OrderDetails id - " + theId);
//		}
//		return theOrderDetails;
//	}

	public void save(OrderDetails theOrderDetails) {
		OrderDetailsRepository.save(theOrderDetails);
	}

	public void deleteById(int theId) {
		OrderDetailsRepository.deleteById(theId);
	}

//	public boolean checkEmailExists(String theEmail) {
//		OrderDetails result = OrderDetailsRepository.findByEmail(theEmail);
//		
//		if (result == null) {
//			return false;
//		}
//		
//		return true;
//	}

}
