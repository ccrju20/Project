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

import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.service.OrderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class OrderRestController {

	private OrderService OrderService;

	@Autowired
	public OrderRestController(OrderService theOrderService) {
		OrderService = theOrderService;
	}

	@GetMapping("/orders")
	public List<Order> findAll() {
		return OrderService.findAll();
	}
	
	@GetMapping("/orders/account/{accountId}")
	public List<Order> findAllById(@PathVariable int accountId) {
		return OrderService.findByAccountId(accountId);
	}

	@GetMapping("/orders/{orderId}")
	public Order getOrder(@PathVariable int orderId) {

		Order theOrder = OrderService.findById(orderId);

		if (theOrder == null) {
			throw new RuntimeException("Order id not found - " + orderId);
		}

		return theOrder;
	}

	@PostMapping("/orders")
	public Order addOrder(@RequestBody Order theOrder) {
										
		theOrder.setId(0);
		theOrder.setDateposted();
		theOrder.setOrdernumber();
	
		OrderService.save(theOrder);
		
		return theOrder;
	}

	@PutMapping("/orders")
	public Order updateOrder(@RequestBody Order theOrder) {

		OrderService.save(theOrder);

		return theOrder;
	}

	@DeleteMapping("/orders/{orderId}")
	public String deleteOrder(@PathVariable int orderId) {

		Order tempOrder = OrderService.findById(orderId);

		if (tempOrder == null) {
			throw new RuntimeException("Order id not found - " + orderId);
		}

		OrderService.deleteById(orderId);

		return "Deleted Order id - " + orderId;
	}

}
