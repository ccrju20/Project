package com.java.springboot.cruddemo.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.entity.ProductOption;

public interface ProductOptionsRepository extends JpaRepository<ProductOption, Integer> {
	List<ProductOption> findByProductId(int id);
	
	@Query("SELECT o from ProductOption o WHERE o.option_id = ?1")
	Optional<ProductOption> findByOptionId(int id);
	
	@Query("SELECT o.id from ProductOption o WHERE o.option_id = ?1")
	int findIdByOptionId(int id);
	
	@Query("SELECT o.product from ProductOption o WHERE o.size = ?1")
	List<Product> findProductsBySize(int size);
} 