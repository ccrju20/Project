package com.java.springboot.cruddemo.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import com.java.springboot.cruddemo.dao.ProductOptionsRepository;
import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.entity.OrderStatus;
import com.java.springboot.cruddemo.entity.ProductOption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.OrderRepository;
import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.models.MyUser;

@Service
public class OrderService {

    private OrderRepository OrderRepository;

    private UserRepository userRepository;

    @Autowired
    public OrderService(OrderRepository theOrderRepository, UserRepository theUserRepository) {
        OrderRepository = theOrderRepository;
        userRepository = theUserRepository;
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

    public void deleteById(int theId) {
        OrderRepository.deleteById(theId);
    }

    public List<Order> findByAccountId(int id) {
        Optional<MyUser> user = userRepository.findById(id);

        List<Order> theOrders = null;

        if (user.isPresent()) {
            Optional<List<Order>> result = OrderRepository.findByAccountId(id);
            theOrders = result.get();
        } else {
            throw new RuntimeException("Did not find Orders with User id - " + id);
        }

        return theOrders;
    }

}
