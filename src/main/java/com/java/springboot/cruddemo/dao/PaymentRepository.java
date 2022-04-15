package com.java.springboot.cruddemo.dao;

import com.java.springboot.cruddemo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
}
