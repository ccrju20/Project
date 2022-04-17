package com.java.springboot.cruddemo.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.validation.Valid;

import com.java.springboot.cruddemo.dto.ProductData;
import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.entity.OrderItem;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.service.OrderService;

@RestController
@RequestMapping("/api/v1/orders")
public class OrderRestController {

    private final OrderService OrderService;

    @Autowired
    public OrderRestController(OrderService theOrderService) {
        OrderService = theOrderService;
    }

    @GetMapping
    public List<Order> findAllOrders() {
        return OrderService.findAllOrders();
    }

    @GetMapping("/account/{accountId}")
    public List<Order> findAllOrdersById(@PathVariable UUID accountId) {
        return OrderService.findOrderByAccountId(accountId);
    }

    @GetMapping("/{orderId}")
    public Order getOrder(@PathVariable int orderId) {
        return OrderService.findOrderById(orderId);
    }

    @GetMapping("/id/{orderNo}")
    public Order findOrder(@PathVariable String orderNo) {
        return OrderService.findByOrderNo(orderNo);
    }

    @PostMapping
    public ResponseEntity<Order> addOrder(@Valid @RequestBody Order theOrder) {
        OrderService.saveOrder(theOrder);

        return new ResponseEntity<>(theOrder, HttpStatus.CREATED);
    }

    @PutMapping
    public Order updateOrder(@RequestBody Order theOrder) {
        OrderService.updateOrder(theOrder);

        return theOrder;
    }

    @DeleteMapping("/{orderId}")
    public String deleteOrder(@PathVariable int orderId) {
        OrderService.deleteOrderById(orderId);

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
    @PutMapping("/{orderNo}/status/{newStatus}")
    public String updateOrderStatus(@PathVariable String orderNo, @PathVariable String newStatus) {
        OrderService.updateOrderStatus(orderNo, newStatus);
        return "Updated order status to " + newStatus;
    }

    // Update order statuses
    @PutMapping("/status/{newStatus}")
    public String updateOrderStatuses(@RequestBody ArrayList<String> orderNos, @PathVariable String newStatus) {
        OrderService.updateOrderStatuses(orderNos, newStatus);
        return "Updated order statuses to " + newStatus;
    }

    @GetMapping("/data")
    public ResponseEntity<Map<String, Integer>> getProductData() {
        Map<String, Integer> response = OrderService.getProductData();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
