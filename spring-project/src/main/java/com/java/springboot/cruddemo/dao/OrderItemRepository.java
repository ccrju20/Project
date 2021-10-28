package com.java.springboot.cruddemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.springboot.cruddemo.entity.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

}
