package com.java.springboot.cruddemo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;
import com.java.springboot.cruddemo.service.PaymentService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class PaymentController {
	
	private PaymentService paymentService;
	
	@Autowired
	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	@PostMapping("/create-payment-intent")
	public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) {
		return paymentService.chargeItems(createPayment);
	}
	
//	@PostMapping("/create-payment-intent")
//	public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) throws StripeException {
//		PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
//				.setAmount(calculateOrderAmount(createPayment.getItems()))
//				.setCurrency("usd")
//				.build();
//
//		PaymentIntent paymentIntent = PaymentIntent.create(params);
//
//		return new CreatePaymentResponse(paymentIntent.getClientSecret());
//	}
}
