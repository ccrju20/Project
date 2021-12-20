package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.entity.ProductOption;

@Service
public class ProductOptionsService {
	
	private ProductOptionsRepository productOptionsRepository;
	
	@Autowired
	public ProductOptionsService(ProductOptionsRepository theProductOptionsRepository) {
		productOptionsRepository = theProductOptionsRepository;
	}

	public List<ProductOption> findAll() {
		return productOptionsRepository.findAll();
	}

	public List<ProductOption> findByProductId(int theId) {
		List<ProductOption> result = productOptionsRepository.findByProductId(theId);
		
		return result;
	}
	
	public ProductOption findById(int theId) {
		Optional<ProductOption> result = productOptionsRepository.findByOptionId(theId);
		
		ProductOption theProductOption = null;
		
		if (result.isPresent()) {
			theProductOption = result.get();
		}
		else {
			throw new RuntimeException("Did not find product option id - " + theId);
		}
		return theProductOption;
	}
	
	public int findIdByOptionId(int theId) {
		int result = productOptionsRepository.findIdByOptionId(theId);
	
		return result;
	}

	public void save(ProductOption theProductOptions) {
		productOptionsRepository.save(theProductOptions);
	}

	public void deleteById(int theId) {
		productOptionsRepository.deleteById(theId);
	}

}
