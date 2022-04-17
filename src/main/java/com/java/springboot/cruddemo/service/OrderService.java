package com.java.springboot.cruddemo.service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.*;

import com.java.springboot.cruddemo.dao.*;
import com.java.springboot.cruddemo.dto.ProductData;
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

    public List<Order> findAllOrders() {
        return OrderRepository.findAll();
    }

    public Order findOrderById(int theId) {
        Order order = OrderRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find Order id " + theId));

        return order;
    }

    public void saveOrder(Order theOrder) {
        theOrder.setId(0);
        theOrder.setDateposted();
        theOrder.setOrdernumber();
        theOrder.setStatus(OrderStatus.PENDING);

        if (theOrder.getAccount() == null) {
            theOrder.setAccount(UUID.fromString("00000000-0000-0000-0000-000000000000"));
        }

        List<OrderItem> theOrderItems = theOrder.getOrderItems();

        theOrderItems.forEach(orderItem -> orderItem
                .setTotal_price(new BigDecimal(orderItem.getQuantity())
                        .multiply(orderItem.getProductOption().getPrice())));

        OrderRepository.save(theOrder);
    }

    public void updateOrder(Order theOrder) {
        OrderRepository.save(theOrder);
    }

    public Order findByOrderNo(String orderNo) {
        Order theOrder = OrderRepository.findByOrderNumber(orderNo)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find order " + orderNo));

        return theOrder;
    }

    public void deleteOrderById(int theId) {
        OrderRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find order id " + theId));

        OrderRepository.deleteById(theId);
    }

    public List<Order> findOrderByAccountId(UUID id) {
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

    public void updateOrderStatus(String orderNo, String newStatus) {
        Order order = OrderRepository.findByOrderNumber(orderNo)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find order number " + orderNo));

        order.setStatus(OrderStatus.valueOf(newStatus.toUpperCase()));
        OrderRepository.save(order);
    }

    public void updateOrderStatuses(ArrayList<String> orderNos, String newStatus) {
        orderNos.forEach(orderNo -> {
            updateOrderStatus(orderNo, newStatus);
        });
    }

    public Map<String, Integer> getProductData() {
        Map<String, Integer> hm = new HashMap<>();
        int daysBack = 3;
        Date startDate = Date.valueOf(LocalDate.now().minusDays(daysBack));
        List<ProductData> items = OrderRepository.getProductData(startDate);

        items.forEach(item -> {
            String productTitle = item.getProduct().getTitle();
            if (hm.containsKey(productTitle)) {
                int currAmount = hm.get(productTitle);
                hm.put(productTitle, currAmount + item.getQuantity());
            } else {
                hm.put(productTitle, item.getQuantity());
            }
        });

        return hm;
    }
}
