package com.java.springboot.cruddemo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.service.ProductService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProductRestController {
	
	private ProductService productService;
	
	// inject product service
	@Autowired
	public ProductRestController(ProductService theProductService) {
		productService = theProductService;
	}
	
	// exposer "/products" and return list of products
	@GetMapping("/products")
	public List<Product> findAll() {
		return productService.findAll();
	}
	
	// add mapping for GET /products/{productId}
	@GetMapping("/products/{productId}")
	public Product getProduct(@PathVariable int productId) {
		
		Product theProduct = productService.findById(productId);
		
		if (theProduct == null) {
			throw new RuntimeException("Product id not found - " + productId);
		}
		
		return theProduct;
	}
	
	// add mapping for POST /products - add new product
	@PostMapping("/products")
	public Product addProduct(@RequestBody Product theProduct) {
		
		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update
		
		theProduct.setId(0);
		
		productService.save(theProduct);
		
		return theProduct;
	}
	
	// add mapping for PUT /products - update existing product
	@PutMapping("/products")
	public Product updateProduct(@RequestBody Product theProduct) {
		
		productService.save(theProduct);
		
		return theProduct;
	}
	
	// add mapping for DELETE /products/{productId} - delete employee
	@DeleteMapping("/products/{productId}")
	public String deleteEmployee(@PathVariable int productId) {
		
		Product tempProduct = productService.findById(productId);
		
		// throw exception if null
		if (tempProduct == null) {
			throw new RuntimeException("Product id not found - " + productId);
		}
		
		productService.deleteById(productId);
		
		return "Deleted product id - " + productId;
	}

}
