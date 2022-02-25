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

import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.service.OrderItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderItemRestController {

	private OrderItemService orderItemService;

	@Autowired
	public OrderItemRestController(OrderItemService theOrderItemService) {
		orderItemService = theOrderItemService;
	}

	@GetMapping("/orderitems")
	public List<OrderItem> findAll() {
		return orderItemService.findAll();
	}
	
	@GetMapping("/orderitems/{orderItemId}")
	public OrderItem getOrderItem(@PathVariable int orderItemId) {

		OrderItem theOrderItem = orderItemService.findById(orderItemId);

		if (theOrderItem == null) {
			throw new RuntimeException("OrderItem id not found - " + orderItemId);
		}

		return theOrderItem;
	}


	@PostMapping("/orderitems")
	public OrderItem addOrderItem(@RequestBody OrderItem theOrderItem) {

		theOrderItem.setId(0);

		orderItemService.save(theOrderItem);

		return theOrderItem;
	}

//	@PostMapping("/orderitemslist")
//	public boolean addProducts(@RequestBody List<Product> products) {
//		try {
//			for (Product product : products) {
//				product.setId(0);
//				productService.save(product);
//			}
//		} catch (Exception e) {
//			return false;
//		}
//
//		return true;
//	}
	
	@PutMapping("/orders/orderitems")
	public OrderItem updateOrder(@RequestBody OrderItem theOrderItem) {

		orderItemService.save(theOrderItem);

		return theOrderItem;
	}
	
	@DeleteMapping("/orderitems/{orderItemId}")
	public String deleteOrderItem(@PathVariable int orderItemId) {

		OrderItem tempOrderItem = orderItemService.findById(orderItemId);

		// throw exception if null
		if (tempOrderItem == null) {
			throw new RuntimeException("OrderItem id not found - " + orderItemId);
		}

		orderItemService.deleteById(orderItemId);

		return "Deleted OrderItem id - " + orderItemId;
	}


}