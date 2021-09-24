package com.java.springboot.cruddemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.java.springboot.cruddemo.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

}
