package com.java.springboot.cruddemo.service;

import org.springframework.stereotype.Service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@Service
public class StripeApi {

	public PaymentIntent create(PaymentIntentCreateParams params) throws StripeException {
		return PaymentIntent.create(params);
	}
}
