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

import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.service.OrderDetailsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class OrderDetailsRestController {

	private OrderDetailsService orderDetailsService;

	@Autowired
	public OrderDetailsRestController(OrderDetailsService theOrderDetailsService) {
		orderDetailsService = theOrderDetailsService;
	}

	@GetMapping("/orderDetails")
	public List<OrderDetails> findAll() {
		return orderDetailsService.findAll();
	}

	// add mapping for GET /OrderDetailss/{OrderDetailsId}
//	@GetMapping("/OrderDetailss/{orderDetailsId}")
//	public OrderDetails getOrderDetails(@PathVariable int OrderDetailsId) {
//
//		OrderDetails theOrderDetails = orderDetailsService.findById(OrderDetailsId);
//
//		if (theOrderDetails == null) {
//			throw new RuntimeException("OrderDetails id not found - " + OrderDetailsId);
//		}
//
//		return theOrderDetails;
//	}
	
//	@GetMapping("/OrderDetailss/email/{orderDetailsEmail}")
//	public OrderDetails getOrderDetails(@PathVariable String OrderDetailsEmail) {
//
//		OrderDetails theOrderDetails = orderDetailsService.findByEmail(OrderDetailsEmail);
//
//		if (theOrderDetails == null) {
//			throw new RuntimeException("OrderDetails email not found - " + OrderDetailsEmail);
//		}
//
//		return theOrderDetails;
//	}

//	@PostMapping("/orderDetails")
//	public OrderDetails addOrderDetails(@RequestBody OrderDetails theOrderDetails) {
//
//		// also just in case they pass an id in JSON ... set id to 0
//		// this is to force a save of new item ... instead of update
//
//		theOrderDetails.setId(0);
//		
//		orderDetailsService.save(theOrderDetails);
//
//		return theOrderDetails;
//	}

	@PutMapping("/orderDetails")
	public OrderDetails updateOrderDetails(@RequestBody OrderDetails theOrderDetails) {

		orderDetailsService.save(theOrderDetails);

		return theOrderDetails;
	}

//	@DeleteMapping("/orderDetails/{orderDetailsId}")
//	public String deleteOrderDetails(@PathVariable int OrderDetailsId) {
//
//		OrderDetails tempOrderDetails = orderDetailsService.findById(OrderDetailsId);
//
//		// throw exception if null
//		if (tempOrderDetails == null) {
//			throw new RuntimeException("OrderDetails id not found - " + OrderDetailsId);
//		}
//
//		orderDetailsService.deleteById(OrderDetailsId);
//
//		return "Deleted OrderDetails id - " + OrderDetailsId;
//	}

}
