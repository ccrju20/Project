package com.java.springboot.cruddemo.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

import com.java.springboot.cruddemo.dao.*;
import com.java.springboot.cruddemo.entity.*;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
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
        Order order = OrderRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find Order id " + theId));

        return order;
    }

    public void save(Order theOrder) {
        theOrder.setId(0);
        theOrder.setDateposted();
        theOrder.setOrdernumber();
        theOrder.setStatus(OrderStatus.PROCESSING);

        if (theOrder.getAccount() == null) {
            theOrder.setAccount(UUID.randomUUID());
        }

        List<OrderItem> theOrderItems = theOrder.getOrderItems();

        theOrderItems.forEach(orderItem -> orderItem
                .setTotal_price(new BigDecimal(orderItem.getQuantity())
                        .multiply(orderItem.getProductOption().getPrice())));

        OrderRepository.save(theOrder);
    }

    public void update(Order theOrder) {
        OrderRepository.save(theOrder);
    }

    public Order findByOrderNo(String orderNo) {
        Order theOrder = OrderRepository.findByOrderNumber(orderNo)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find order " + orderNo));

        return theOrder;
    }

    public void deleteById(int theId) {
        OrderRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find order id " + theId));

        OrderRepository.deleteById(theId);
    }

    public List<Order> findByAccountId(UUID id) {
        userRepository.findByUuid(id)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("User id %s not found", id)));

        return OrderRepository.findByAccount(id).get();
    }

    public void saveOrderDetails(OrderDetails theOrderDetails) {
        orderDetailsRepository.save(theOrderDetails);
    }

    public void saveOrderItem(OrderItem theOrderItem) {
        orderItemRepository.save(theOrderItem);
    }

    public void deleteOrderItemById(int theId) {
        orderItemRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException(String.format("Order item id %s not found", theId)));

        orderItemRepository.deleteById(theId);
    }

    public void updateStatus(String orderNo, String newStatus) {
        Order order = OrderRepository.findByOrderNumber(orderNo)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find order number " + orderNo));

        order.setStatus(OrderStatus.valueOf(newStatus.toUpperCase()));
        OrderRepository.save(order);
    }
}
