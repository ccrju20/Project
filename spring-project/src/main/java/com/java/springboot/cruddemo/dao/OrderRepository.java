package com.java.springboot.cruddemo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT o from Order o WHERE o.account.id = ?1")
	Optional<List<Order>> findByAccountId(int id);

}
