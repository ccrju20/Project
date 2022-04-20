package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dao.PaymentRepository;
import com.java.springboot.cruddemo.entity.Payment;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;

import java.math.BigDecimal;
import java.time.Instant;
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
}
