package com.java.springboot.cruddemo;

import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Objects;

import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.java.springboot.cruddemo.dto.CartItem;
import com.java.springboot.cruddemo.dto.CreatePayment;

@SpringBootTest
@AutoConfigureMockMvc
public class PaymentIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void itShouldCreateStripePaymentIntent() throws Exception {
		// given
		CartItem[] cartItems = new CartItem[]{};
		CreatePayment createPayment = new CreatePayment(cartItems);

		// when 
		ResultActions paymentIntentResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/payment/create-payment-intent")
			.contentType(MediaType.APPLICATION_JSON)
			.content(Objects.requireNonNull(objectToJson(createPayment))));
		
		// then
		paymentIntentResultActions.andExpect(status().isOk());
		paymentIntentResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.clientSecret", CoreMatchers.is("mockClientSecret")));
	}

	private String objectToJson(Object object) {
		try {
			return new ObjectMapper().writeValueAsString(object);
		} catch (JsonProcessingException e) {
			fail("Failed to convert object to JSON");
			return null;
		}
	}

}
