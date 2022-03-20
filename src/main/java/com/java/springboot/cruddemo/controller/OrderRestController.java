package com.java.springboot.cruddemo.controller;

import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.service.OrderService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/orders")
public class OrderRestController {

    private final OrderService OrderService;

    @Autowired
    public OrderRestController(OrderService theOrderService) {
        OrderService = theOrderService;
    }

    @GetMapping
    public List<Order> findAll() {
        return OrderService.findAll();
    }

    @GetMapping("/account/{accountId}")
    public List<Order> findAllById(@PathVariable UUID accountId) {
        return OrderService.findByAccountId(accountId);
    }

    @GetMapping("/{orderId}")
    public Order getOrder(@PathVariable int orderId) {
        return OrderService.findById(orderId);
    }

    @GetMapping("/id/{orderNo}")
    public Order findOrder(@PathVariable String orderNo) {
        return OrderService.findByOrderNo(orderNo);
    }

    @PostMapping
    public ResponseEntity<Order> addOrder(@Valid @RequestBody Order theOrder) {
        OrderService.save(theOrder);

        return new ResponseEntity<>(theOrder, HttpStatus.CREATED);
    }

    @PutMapping
    public Order updateOrder(@RequestBody Order theOrder) {
        OrderService.update(theOrder);

        return theOrder;
    }

    @DeleteMapping("/{orderId}")
    public String deleteOrder(@PathVariable int orderId) {
        OrderService.deleteById(orderId);

        return "Deleted Order id " + orderId;
    }

    @PutMapping("/orderdetails")
    public OrderDetails updateOrderDetails(@RequestBody OrderDetails theOrderDetails) {
        OrderService.saveOrderDetails(theOrderDetails);

        return theOrderDetails;
    }

    @PutMapping("/orderitems")
    public OrderItem updateOrderItem(@RequestBody OrderItem theOrderItem) {
        OrderService.saveOrderItem(theOrderItem);

        return theOrderItem;
    }

    @DeleteMapping("/orderitems/{orderItemId}")
    public String deleteOrderItem(@PathVariable int orderItemId) {
        OrderService.deleteOrderItemById(orderItemId);

        return "Deleted OrderItem id - " + orderItemId;
    }

    // Update order status
    @PutMapping("/order/{orderNo}/status/{newStatus}")
    public String updateOrderStatus(@PathVariable String orderNo, @PathVariable String newStatus) {
        OrderService.updateStatus(orderNo, newStatus);
        return "Updated order status to " + newStatus;
    }
}
