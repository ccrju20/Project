package com.java.springboot.cruddemo.dao;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT o from Order o WHERE o.account= ?1")
	Optional<List<Order>> findByAccount(UUID id);

	@Query("SELECT o from Order o WHERE o.ordernumber= ?1")
	Optional<Order> findByOrderNumber(String orderNo);

}
