package com.java.springboot.cruddemo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.springboot.cruddemo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {
	
	  Optional<List<Order>> findByAccountId(int id);

}
