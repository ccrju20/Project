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
@RequestMapping("/api/v1/payment")
public class PaymentController {
	
	private final PaymentService paymentService;
	
	@Autowired
	public PaymentController(PaymentService paymentService) {
		this.paymentService = paymentService;
	}

	@PostMapping("/create-payment-intent")
	public CreatePaymentResponse createPaymentIntent(@RequestBody CreatePayment createPayment) {
		return paymentService.chargeItems(createPayment);
	}

}
