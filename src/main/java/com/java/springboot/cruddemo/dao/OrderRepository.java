package com.java.springboot.cruddemo.dao;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.java.springboot.cruddemo.dto.ProductData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.entity.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

	@Query("SELECT o from Order o WHERE o.account= ?1")
	Optional<List<Order>> findByAccount(UUID id);

	@Query("SELECT o from Order o WHERE o.ordernumber= ?1")
	Optional<Order> findByOrderNumber(String orderNo);

	@Query("SELECT new com.java.springboot.cruddemo.dto.ProductData(o.dateposted, i.quantity, i.product) " +
			"FROM Order o JOIN o.orderItems i " +
			"WHERE DATE(dateposted) >= ?1")
	List<ProductData> getProductData(Date startDate);

	@Query("SELECT COUNT(o) from Order o WHERE o.status='PENDING'")
	int getTotalPending();
}
