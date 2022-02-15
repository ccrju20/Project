package com.java.springboot.cruddemo.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.java.springboot.cruddemo.dto.CartItem;
import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

class StripeServiceTest {
	
	@Mock
	private StripeApi stripeApi;

	private StripeService underTest;


	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		underTest = new StripeService(stripeApi);
	}
	
	@Test
	void itShouldCreatePaymentIntent() throws StripeException {
		// given
		CartItem[] cartItems = new CartItem[]{};
		CreatePayment createPayment = new CreatePayment(cartItems);
		PaymentIntent paymentIntent = new PaymentIntent();
		
		given(stripeApi.create(any(PaymentIntentCreateParams.class))).willReturn(paymentIntent);
		
		// when
		 CreatePaymentResponse createPaymentResponse = underTest.chargeItems(createPayment);
		
		// then
	     ArgumentCaptor<PaymentIntentCreateParams> paramsArgumentCaptor = ArgumentCaptor.forClass(PaymentIntentCreateParams.class);
	     
	     then(stripeApi).should().create(paramsArgumentCaptor.capture());
	     
	     PaymentIntentCreateParams paymentIntentParams = paramsArgumentCaptor.getValue();
	     assertThat(paymentIntentParams).isNotNull();
	     assertThat(createPaymentResponse).isNotNull();
	     assertThat(createPaymentResponse).hasFieldOrProperty("clientSecret");
	}

}
