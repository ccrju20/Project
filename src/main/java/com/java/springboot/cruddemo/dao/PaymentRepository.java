package com.java.springboot.cruddemo.dao;

import com.java.springboot.cruddemo.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    @Query(value = "SELECT * from Payment p WHERE DATE(created) = ?1", nativeQuery = true)
    List<Payment> findPaymentsByDate(LocalDate date);

    @Query(value = "SELECT * from Payment p WHERE DATE(created) >= ?1", nativeQuery = true)
    List<Payment> findPaymentsFrom(LocalDate from);
}
