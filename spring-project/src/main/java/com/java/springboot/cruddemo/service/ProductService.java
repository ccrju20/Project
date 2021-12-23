package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.dao.ProductRepository;
import com.java.springboot.cruddemo.entity.Product;

@Service
public class ProductService {
	
	private ProductRepository productRepository;
	private ProductOptionsRepository productOptionsRepository;
	
	@Autowired
	public ProductService(ProductRepository theProductRepository, ProductOptionsRepository theProductOptionsRepository) {
		productRepository = theProductRepository;
		productOptionsRepository = theProductOptionsRepository;
	}

	public List<Product> findAll() {
		return productRepository.findAll();
	}

	public Product findById(int theId) {
		Optional<Product> result = productRepository.findById(theId);
		
		Product theProduct = null;
		
		if (result.isPresent()) {
			theProduct = result.get();
		}
		else {
			throw new RuntimeException("Did not find product id - " + theId);
		}
		return theProduct;
	}

	public void save(Product theProduct) {
		productRepository.save(theProduct);
	}

	public void deleteById(int theId) {
		productRepository.deleteById(theId);
	}
	
	public Page<Product> findPaginated(int pageNo, int pageSize) {
		Pageable pageable = PageRequest.of(pageNo -1, pageSize);
		return productRepository.findAll(pageable);
	}
	
	public Page<Product> findByCategory(String category, int pageNo, int pageSize) {
		if (NumberUtils.isCreatable(category)) {
			int size = NumberUtils.createInteger(category);
			
			List<Product> products = productOptionsRepository.findProductsBySize(size);
		
			Pageable pageable = PageRequest.of(pageNo -1, pageSize);
			Page<Product> productsPage = new PageImpl<>(products, pageable, products.size());
			
			return productsPage;
		}
		Pageable pageable = PageRequest.of(pageNo -1, pageSize);
		return productRepository.findByCategory(category, pageable);
	}
	
}
