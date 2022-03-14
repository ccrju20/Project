package com.java.springboot.cruddemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;

@Service
public class PaymentService {
	
	private final CreatePaymentBuilder createPaymentBuilder;

	@Autowired
	public PaymentService(CreatePaymentBuilder createPaymentBuilder) {
		this.createPaymentBuilder = createPaymentBuilder;
	}
	
	public CreatePaymentResponse chargeItems(CreatePayment createPayment) {
		CreatePaymentResponse paymentResponse = createPaymentBuilder.chargeItems(createPayment);
		
        if (paymentResponse.getClientSecret().isBlank()) {
            throw new IllegalStateException(String.format("Payment not created"));
        }
        
        return paymentResponse;
	}
	
}
