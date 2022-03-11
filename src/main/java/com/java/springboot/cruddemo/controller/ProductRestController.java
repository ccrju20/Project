package com.java.springboot.cruddemo.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProductRestController {

	private ProductService productService;

	@Autowired
	public ProductRestController(ProductService theProductService) {
		productService = theProductService;
	}
	
	@GetMapping("/products")
	public ResponseEntity<Map<String, Object>> findAll(
			@RequestParam(required = false) String category,
			@RequestParam(defaultValue = "1") int page,
			@RequestParam(defaultValue = "9") int size
			) {
		
		try {
			List<Product> products = new ArrayList<Product>();			
			Page<Product> pageProducts = productService.findPaginated(page, size);
			
			if (category != null) {
				pageProducts = productService.findByCategory(category, page, size);
			}
			
			products = pageProducts.getContent();
			
			Map<String, Object> response = new HashMap<>();
			response.put("products", products);
			response.put("currentPage", pageProducts.getNumber());
			response.put("totalItems", pageProducts.getTotalElements());
			response.put("totalPages", pageProducts.getTotalPages());
			
			return new ResponseEntity<>( response, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}

	@GetMapping("/products/all")
	public List<Product> findAll() {
		return productService.findAll();
	}

	@GetMapping("/products/{productId}")
	public Product getProduct(@PathVariable int productId) {

		Product theProduct = productService.findById(productId);

		if (theProduct == null) {
			throw new RuntimeException("Product id not found - " + productId);
		}

		return theProduct;
	}

	@PostMapping("/products")
	public Product addProduct(@RequestBody Product theProduct) {

		productService.save(theProduct);

		return theProduct;
	}

	@PostMapping("/productslist")
	public boolean addProducts(@RequestBody List<Product> products) {
		try {
			for (Product product : products) {
				product.setId(0);
				productService.save(product);
			}
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	@PutMapping("/products")
	public Product updateProduct(@RequestBody Product theProduct) {

		productService.save(theProduct);

		return theProduct;
	}

	@DeleteMapping("/products/{productId}")
	public String deleteProduct(@PathVariable int productId) {

		Product tempProduct = productService.findById(productId);

		if (tempProduct == null) {
			throw new RuntimeException("Product id not found - " + productId);
		}

		productService.deleteById(productId);

		return "Deleted product id - " + productId;
	}

}
