package com.java.springboot.cruddemo.controller;

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

import com.java.springboot.cruddemo.entity.ProductOption;
import com.java.springboot.cruddemo.service.ProductOptionsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ProductOptionsRestController {

	private ProductOptionsService productOptionsService;

	@Autowired
	public ProductOptionsRestController(ProductOptionsService theProductOptionsService) {
		productOptionsService = theProductOptionsService;
	}

	@GetMapping("/products/options")
	public List<ProductOption> findAll() {
		return productOptionsService.findAll();
	}
	
	// Get a product option using the option_id
	@GetMapping("/products/options/{optionId}")
	public ProductOption findById(@PathVariable int optionId) {
		
		ProductOption productOption = productOptionsService.findById(optionId);
		
		return productOption;
	}

	// Get a list of product options using product id
	@GetMapping("/products/{productId}/options")
	public List<ProductOption> getProduct(@PathVariable int productId) {

		List<ProductOption> productOptions = productOptionsService.findByProductId(productId);

		return productOptions;
	}

	// Add option to an existing product
	@PostMapping("/products/options")
	public ProductOption addProduct(@RequestBody ProductOption theProductOption) {

		theProductOption.setId(0);

		productOptionsService.save(theProductOption);

		return theProductOption;
	}

	// Edit a product option
	@PutMapping("/products/options")
	public ProductOption updateProductOption(@RequestBody ProductOption theProductOption) {

		productOptionsService.save(theProductOption);

		return theProductOption;
	}

	// Deleting product option using option_id > id
	@DeleteMapping("/products/options/{productOptionId}")
	public String deleteProductOption(@PathVariable int productOptionId) {

		int theId = productOptionsService.findIdByOptionId(productOptionId);

		productOptionsService.deleteById(theId);

		return "Deleted product option id - " + productOptionId;
	}

}
