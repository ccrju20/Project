package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dao.OrderRepository;
import com.java.springboot.cruddemo.dao.PaymentRepository;
import com.java.springboot.cruddemo.dao.ProductRepository;
import com.java.springboot.cruddemo.dto.ProductData;
import com.java.springboot.cruddemo.entity.Payment;
import com.java.springboot.cruddemo.entity.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private PaymentRepository paymentRepository;
    private OrderRepository orderRepository;
    private ProductRepository productRepository;

    @Autowired
    public DashboardService(PaymentRepository paymentRepository, OrderRepository orderRepository, ProductRepository productRepository) {
        this.paymentRepository = paymentRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public BigDecimal getTotalToday() {
        List<Payment> result = paymentRepository.findPaymentsByDate(LocalDate.now());

        BigDecimal total = result.stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return total;
    }

    public Map<LocalDate, BigDecimal> getPaymentsFrom() {
        Map<LocalDate, BigDecimal> hm = new HashMap<>();
        LocalDate today = LocalDate.now();
        int daysBack = 4;
        for (int i = 0; i <= daysBack; i++) {
            hm.put(today.minusDays(i), new BigDecimal(0));
        }

        LocalDate startDate = today.minusDays(daysBack);
        List<Payment> result = paymentRepository.findPaymentsFrom(startDate);
        result.forEach(payment -> {
            LocalDate theKey = convertToLocalDate(payment.getCreated());
            if (hm.containsKey(theKey)) {
                BigDecimal currAmount = hm.get(theKey);
                hm.put(theKey, currAmount.add(payment.getAmount()));
            }
        });

        TreeMap<LocalDate, BigDecimal> sorted = new TreeMap<>(hm);

        return sorted;
    }

    public Map<String, Integer> getProductData() {
        List<Product> products = productRepository.findAll();
        Map<String, Integer> hm = new HashMap<>();
        products.forEach(p -> hm.put(p.getTitle(), 0));

        int daysBack = 7;
        Date startDate = Date.valueOf(LocalDate.now().minusDays(daysBack));
        List<ProductData> items = orderRepository.getProductData(startDate);

        items.forEach(item -> {
            String productTitle = item.getProduct().getTitle();
            if (hm.containsKey(productTitle)) {
                int currAmount = hm.get(productTitle);
                hm.put(productTitle, currAmount + item.getQuantity());
            }
        });

        Map<String, Integer> sortedValues = hm.entrySet()
                .stream()
                .sorted(Map.Entry.comparingByValue(Comparator.reverseOrder()))
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue,
                        (oldValue, newValue) -> oldValue, LinkedHashMap::new));

        return sortedValues;
    }

    public int totalPendingOrders() {
        return orderRepository.getTotalPending();
    }

    public LocalDate convertToLocalDate(LocalDateTime dateToConvert) {
        return dateToConvert.toLocalDate();
    }
}
