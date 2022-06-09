package com.java.springboot.cruddemo.dao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.java.springboot.cruddemo.entity.Product;

import java.util.ArrayList;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {
	Page<Product> findByCategory(String category, Pageable pageable);

	List<Product> findByCategoryNotIn(ArrayList<String> categories);

}
