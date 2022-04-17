package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dao.PaymentRepository;
import com.java.springboot.cruddemo.entity.Payment;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;

import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class PaymentService {

    private final CreatePaymentBuilder createPaymentBuilder;
    private final PaymentRepository paymentRepository;

    @Autowired
    public PaymentService(CreatePaymentBuilder createPaymentBuilder, PaymentRepository paymentRepository) {
        this.createPaymentBuilder = createPaymentBuilder;
        this.paymentRepository = paymentRepository;
    }

    public CreatePaymentResponse chargeItems(CreatePayment createPayment) {
        CreatePaymentResponse paymentResponse = createPaymentBuilder.chargeItems(createPayment);

        if (paymentResponse.getClientSecret().isBlank()) {
            throw new IllegalStateException(String.format("Payment not created"));
        }

        return paymentResponse;
    }

    public void fulfillPayment(PaymentIntent paymentIntent) {
        System.out.println("Payment id: " + paymentIntent.getId());
        System.out.println("Payment for " + paymentIntent.getAmount() + " succeeded.");
        System.out.println("Payment created: " + paymentIntent.getCreated());

        BigDecimal total = BigDecimal.valueOf(paymentIntent.getAmount());
        BigDecimal amount = total.divide(new BigDecimal(100));

        long timestamp = paymentIntent.getCreated();
        LocalDateTime created =
                LocalDateTime.ofInstant(Instant.ofEpochSecond(timestamp), TimeZone
                        .getDefault().toZoneId());

        Payment payment = new Payment(paymentIntent.getId(), amount, created);
        paymentRepository.save(payment);
    }

    public BigDecimal getTodayPayments() {
        List<Payment> result = paymentRepository.findPaymentsByDate(LocalDate.now());

        BigDecimal total = result.stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return total;
//		return paymentRepository.findAll(Sort.by(Sort.Direction.ASC, "created"));
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

    public LocalDate convertToLocalDate(LocalDateTime dateToConvert) {
        return dateToConvert.toLocalDate();
    }
}
