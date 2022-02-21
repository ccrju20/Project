package com.java.springboot.cruddemo.service;

import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;

@Service
@ConditionalOnProperty(value = "stripe.enabled", havingValue = "false")
public class MockStripeService implements CreatePaymentBuilder {

	@Override
	public CreatePaymentResponse chargeItems(CreatePayment createPayment) {
		return new CreatePaymentResponse("mockClientSecret");
	}

}
