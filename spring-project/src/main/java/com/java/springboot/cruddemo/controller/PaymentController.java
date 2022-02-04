package com.java.springboot.cruddemo.controller;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.dto.CartItem;
import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentController {

	static long calculateOrderAmount(CartItem[] items) {
		double total = 0;
		for (CartItem x : items) {
			total += x.getTotal();
		}
		return (long) (total * 100);
	}

	@PostMapping("/create-payment-intent")
	public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) throws StripeException {
		PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
				.setAmount(calculateOrderAmount(createPayment.getItems()))
				.setCurrency("usd")
				.build();

		// Create a PaymentIntent with the order amount and currency
		PaymentIntent paymentIntent = PaymentIntent.create(params);

		return new CreatePaymentResponse(paymentIntent.getClientSecret());
	}
}
