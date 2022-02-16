package com.java.springboot.cruddemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dto.CartItem;
import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

@Service
public class StripeService implements CreatePaymentBuilder{
	
	static long calculateOrderAmount(CartItem[] items) {
		double total = 0;
		for (CartItem x : items) {
			total += x.getTotal();
		}
		return (long) (total * 100);
	}
	
	private StripeApi stripeApi;
	
	@Autowired
	public StripeService(StripeApi stripeApi) {
		this.stripeApi = stripeApi;
	}

	@Override
	public CreatePaymentResponse chargeItems(CreatePayment createPayment) {
		PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
				.setAmount(calculateOrderAmount(createPayment.getItems()))
				.setCurrency("usd")
				.build();
		try {
			PaymentIntent paymentIntent = stripeApi.create(params);
			return new CreatePaymentResponse(paymentIntent.getClientSecret());
		} catch (StripeException e) {
            throw new IllegalStateException("Cannot make Stripe payment intent", e);
		}
	}

}
