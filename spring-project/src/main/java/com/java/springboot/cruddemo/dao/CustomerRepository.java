package com.java.springboot.cruddemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.java.springboot.cruddemo.entity.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

	  @Query("SELECT c from Customer c WHERE c.email = ?1")
	  Customer findByEmail(String email);
	  
//	  @Query("SELECT c.id from Customer c WHERE c.email = ?1")
//	  int findIdByEmail(String email);
}
