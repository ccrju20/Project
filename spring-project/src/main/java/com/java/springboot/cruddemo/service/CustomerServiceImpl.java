package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.CustomerRepository;
import com.java.springboot.cruddemo.entity.Customer;

@Service
public class CustomerServiceImpl implements CustomerService {
	
	private CustomerRepository CustomerRepository;
	
	@Autowired
	public CustomerServiceImpl(CustomerRepository theCustomerRepository) {
		CustomerRepository = theCustomerRepository;
	}

	@Override
	public List<Customer> findAll() {
		return CustomerRepository.findAll();
	}

	@Override
	public Customer findById(int theId) {
		Optional<Customer> result = CustomerRepository.findById(theId);
		
		Customer theCustomer = null;
		
		if (result.isPresent()) {
			theCustomer = result.get();
		}
		else {
			// we didn't find the Customer
			throw new RuntimeException("Did not find Customer id - " + theId);
		}
		return theCustomer;
	}

	@Override
	public void save(Customer theCustomer) {
		CustomerRepository.save(theCustomer);
	}

	@Override
	public void deleteById(int theId) {
		CustomerRepository.deleteById(theId);
	}

	@Override
	public Customer findByEmail(String theEmail) {
		Customer result = CustomerRepository.findByEmail(theEmail);

		if (result == null) {
			throw new RuntimeException("Did not find Customer email- " + theEmail);
		}
		
		return result;
	}
	
	@Override
	public boolean checkEmailExists(String theEmail) {
		Customer result = CustomerRepository.findByEmail(theEmail);
		
		if (result == null) {
			return false;
		}
		
		return true;
	}

//	@Override
//	public int findIdByEmail(String theEmail) {
//		int theId = CustomerRepository.findIdByEmail(theEmail);
//		return theId;
//	}

}
