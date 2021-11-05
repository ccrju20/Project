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

	// inject Order service
	@Autowired
	public OrderRestController(OrderService theOrderService) {
		OrderService = theOrderService;
	}

	// exposer "/Orders" and return list of Orders
	@GetMapping("/orders")
	public List<Order> findAll() {
		return OrderService.findAll();
	}

	// add mapping for GET /Orders/{OrderId}
	@GetMapping("/orders/{orderId}")
	public Order getOrder(@PathVariable int orderId) {

		Order theOrder = OrderService.findById(orderId);

		if (theOrder == null) {
			throw new RuntimeException("Order id not found - " + orderId);
		}

		return theOrder;
	}

	// add mapping for POST /Orders - add new Order
	@PostMapping("/orders")
	public Order addOrder(@RequestBody Order theOrder) {

		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update

		theOrder.setId(0);

		OrderService.save(theOrder);

		return theOrder;
	}

//	@PostMapping("/Orderslist")
//	public boolean addOrders(@RequestBody List<Order> Orders) {
//		try {
//			for (Order Order : Orders) {
//				Order.setId(0);
//				OrderService.save(Order);
//			}
//		} catch (Exception e) {
//			return false;
//		}
//
//		return true;
//	}

	// add mapping for PUT /Orders - update existing Order
	@PutMapping("/orders")
	public Order updateOrder(@RequestBody Order theOrder) {

		OrderService.save(theOrder);

		return theOrder;
	}

	// add mapping for DELETE /Orders/{OrderId} - delete Order
	@DeleteMapping("/orders/{orderId}")
	public String deleteOrder(@PathVariable int orderId) {

		Order tempOrder = OrderService.findById(orderId);

		// throw exception if null
		if (tempOrder == null) {
			throw new RuntimeException("Order id not found - " + orderId);
		}

		OrderService.deleteById(orderId);

		return "Deleted Order id - " + orderId;
	}

}
