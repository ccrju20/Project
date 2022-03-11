package com.java.springboot.cruddemo.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import com.java.springboot.cruddemo.dao.*;
import com.java.springboot.cruddemo.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.models.MyUser;

@Service
public class OrderService {

    private final OrderRepository OrderRepository;
    private final UserRepository userRepository;
    private final OrderDetailsRepository orderDetailsRepository;
    private final OrderItemRepository orderItemRepository;

    @Autowired
    public OrderService(OrderRepository theOrderRepository, UserRepository theUserRepository, OrderDetailsRepository theOrderDetailsRepository, OrderItemRepository theOrderItemRepository) {
        OrderRepository = theOrderRepository;
        userRepository = theUserRepository;
        orderDetailsRepository = theOrderDetailsRepository;
        orderItemRepository = theOrderItemRepository;
    }

    public List<Order> findAll() {
        return OrderRepository.findAll();
    }

    public Order findById(int theId) {
        Optional<Order> result = OrderRepository.findById(theId);

        Order theOrder = null;

        if (result.isPresent()) {
            theOrder = result.get();
        } else {
            throw new RuntimeException("Did not find Order id - " + theId);
        }
        return theOrder;
    }

    public void save(Order theOrder) {
        theOrder.setId(0);
        theOrder.setDateposted();
        theOrder.setOrdernumber();
        theOrder.setStatus(OrderStatus.PROCESSING);

        List<OrderItem> theOrderItems = theOrder.getOrderItems();

        theOrderItems.forEach(orderItem -> orderItem
                .setTotal_price(new BigDecimal(orderItem.getQuantity())
                        .multiply(orderItem.getProductOption().getPrice())));

        OrderRepository.save(theOrder);
    }

    public void update(Order theOrder) {
//        theOrder.setStatus(OrderStatus.PROCESSING);
        OrderRepository.save(theOrder);
    }

    public Order findByOrderNo (String orderNo) {
        Optional<Order> theOrder = OrderRepository.findByOrderNumber(orderNo);

        Order order = null;
        if (theOrder.isPresent()) {
            order = theOrder.get();
        } else {
            throw new RuntimeException("Order Number not found - " + orderNo);
        }

        return order;
    }

    public void deleteById(int theId) {
        Optional<Order> tempOrder = OrderRepository.findById(theId);

        if (tempOrder == null) {
            throw new RuntimeException("Order id not found - " + theId);
        }
        OrderRepository.deleteById(theId);
    }

    public List<Order> findByAccountId(UUID id) {
        Optional<MyUser> user = userRepository.findByUuid(id);

        List<Order> theOrders = null;

        if (user.isPresent()) {
            Optional<List<Order>> result = OrderRepository.findByAccount(id);
            theOrders = result.get();
        } else {
            throw new RuntimeException("Did not find Orders with User id - " + id);
        }

        return theOrders;
    }

    public void saveOrderDetails(OrderDetails theOrderDetails) {
        orderDetailsRepository.save(theOrderDetails);
    }

    public void saveOrderItem(OrderItem theOrderItem) {
        orderItemRepository.save(theOrderItem);
    }

    public void deleteOrderItemById(int theId) {
        Optional<OrderItem> tempOrderItem = orderItemRepository.findById(theId);

        if (tempOrderItem == null) {
            throw new RuntimeException("OrderItem id not found - " + theId);
        }
        orderItemRepository.deleteById(theId);
    }

    public void updateStatus(String orderNo, String newStatus) {
        Optional<Order> theOrder = OrderRepository.findByOrderNumber(orderNo);
        Order order = null;
        if (theOrder.isPresent()) {
            order = theOrder.get();
        } else {
            throw new RuntimeException("Order Number not found - " + orderNo);
        }

        order.setStatus(OrderStatus.valueOf(newStatus.toUpperCase()));
        OrderRepository.save(order);
    }
}
