package com.java.springboot.cruddemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.java.springboot.cruddemo.entity.OrderDetails;

public interface OrderDetailsRepository extends JpaRepository<OrderDetails, Integer> {

	  @Query("SELECT c from OrderDetails c WHERE c.email = ?1")
	  OrderDetails findByEmail(String email);
	  
//	  @Query("SELECT c.id from OrderDetails c WHERE c.email = ?1")
//	  int findIdByEmail(String email);
}
