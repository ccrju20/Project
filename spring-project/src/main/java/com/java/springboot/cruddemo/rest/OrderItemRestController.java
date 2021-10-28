package com.java.springboot.cruddemo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.service.OrderItemService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/orders")
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


	@PostMapping("/orderitems")
	public OrderItem addOrderItem(@RequestBody OrderItem theOrderItem) {

		// also just in case they pass an id in JSON ... set id to 0
		// this is to force a save of new item ... instead of update

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


}
