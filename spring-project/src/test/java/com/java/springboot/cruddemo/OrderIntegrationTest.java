package com.java.springboot.cruddemo;

import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.Objects;

import org.hamcrest.CoreMatchers;
import org.json.JSONObject;
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
import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.entity.Order;
import com.java.springboot.cruddemo.entity.OrderDetails;
import com.java.springboot.cruddemo.entity.OrderItem;
import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.payload.AuthenticationRequest;
import com.java.springboot.cruddemo.payload.RegistrationRequest;

@SpringBootTest
@AutoConfigureMockMvc
public class OrderIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void itShouldGetOrderAfterPlacing() throws Exception {
		// given
		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, new MyUser(),
				new ArrayList<OrderItem>(), new OrderDetails("first", "last", "test@gmail.com", "1111111111"));

		// when
		ResultActions orderResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/orders")
				.contentType(MediaType.APPLICATION_JSON).content(Objects.requireNonNull(objectToJson(order))));

		// then
		int orderId = 1;
		orderResultActions.andExpect(status().isCreated());
		orderResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.id", CoreMatchers.is(orderId)));

		//
		mockMvc.perform(get("/api/orders/{orderId}", orderId).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$.id").value(1));
	}

	@Test
	void itShouldGetOrdersForAuthenticatedUser() throws Exception {
		// given
		String email = "test@gmail.com";
		RegistrationRequest regRequest = new RegistrationRequest(email, "password", new ContactInfo("first", "last"));
		mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/registration").contentType(MediaType.APPLICATION_JSON)
				.content(Objects.requireNonNull(objectToJson(regRequest))));

		AuthenticationRequest authRequest = new AuthenticationRequest(email, "password");
		mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login").contentType(MediaType.APPLICATION_JSON)
				.content(Objects.requireNonNull(objectToJson(authRequest)))).andExpect(status().isOk());

		// get user
		String theUser = mockMvc.perform(get("/api/auth/users/1").accept(MediaType.APPLICATION_JSON)).andReturn()
				.getResponse().getContentAsString();
		MyUser account = new ObjectMapper().readValue(theUser, MyUser.class);

		Order order = new Order("ordernumber", "dateposted", "scheduled", "status", 0, account,
				new ArrayList<OrderItem>(), new OrderDetails("first", "last", email, "1111111111"));

		// add account field to post request body since Order method getAccount ignored
		JSONObject jsonobj = new JSONObject(objectToJson(order)).put("account",
				new JSONObject().put("id", account.getId()));
		String postBody = String.valueOf(jsonobj);

		mockMvc.perform(MockMvcRequestBuilders.post("/api/orders").contentType(MediaType.APPLICATION_JSON)
				.content(Objects.requireNonNull(postBody))).andExpect(status().isCreated());

		// when
		// then
		mockMvc.perform(MockMvcRequestBuilders.get("/api/orders/account/{accountId}", account.getId())
				.accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$.size()").value(1));
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
