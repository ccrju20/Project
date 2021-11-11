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

import com.java.springboot.cruddemo.entity.Customer;
import com.java.springboot.cruddemo.service.CustomerService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class CustomerRestController {

	private CustomerService CustomerService;

	// inject Customer service
	@Autowired
	public CustomerRestController(CustomerService theCustomerService) {
		CustomerService = theCustomerService;
	}

	// exposer "/Customers" and return list of Customers
	@GetMapping("/customers")
	public List<Customer> findAll() {
		return CustomerService.findAll();
	}

	// add mapping for GET /Customers/{CustomerId}
	@GetMapping("/customers/{customerId}")
	public Customer getCustomer(@PathVariable int customerId) {

		Customer theCustomer = CustomerService.findById(customerId);

		if (theCustomer == null) {
			throw new RuntimeException("Customer id not found - " + customerId);
		}

		return theCustomer;
	}
	
	@GetMapping("/customers/email/{customerEmail}")
	public Customer getCustomer(@PathVariable String customerEmail) {

		Customer theCustomer = CustomerService.findByEmail(customerEmail);

		if (theCustomer == null) {
			throw new RuntimeException("Customer email not found - " + customerEmail);
		}

		return theCustomer;
	}

	// add mapping for POST /Customers - add new Customer
	@PostMapping("/customers")
	public Customer addCustomer(@RequestBody Customer theCustomer) {

		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update

		theCustomer.setId(0);
		
		CustomerService.save(theCustomer);

		return theCustomer;
	}

//	@PostMapping("/Customerslist")
//	public boolean addCustomers(@RequestBody List<Customer> Customers) {
//		try {
//			for (Customer Customer : Customers) {
//				Customer.setId(0);
//				CustomerService.save(Customer);
//			}
//		} catch (Exception e) {
//			return false;
//		}
//
//		return true;
//	}

	// add mapping for PUT /Customers - update existing Customer
	@PutMapping("/customers")
	public Customer updateCustomer(@RequestBody Customer theCustomer) {

		CustomerService.save(theCustomer);

		return theCustomer;
	}

	// add mapping for DELETE /Customers/{CustomerId} - delete Customer
	@DeleteMapping("/customers/{customerId}")
	public String deleteCustomer(@PathVariable int customerId) {

		Customer tempCustomer = CustomerService.findById(customerId);

		// throw exception if null
		if (tempCustomer == null) {
			throw new RuntimeException("Customer id not found - " + customerId);
		}

		CustomerService.deleteById(customerId);

		return "Deleted Customer id - " + customerId;
	}

}
