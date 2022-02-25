package com.java.springboot.cruddemo;

import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

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
import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.payload.AuthenticationRequest;
import com.java.springboot.cruddemo.payload.RegistrationRequest;

@SpringBootTest
@AutoConfigureMockMvc
public class UserIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void itShouldLogUserInAfterRegistration() throws Exception {
		// given
		String email = "test@gmail.com";
		String password = "password";
		ContactInfo contactInfo = new ContactInfo("Test", "User");
		RegistrationRequest regRequest = new RegistrationRequest(email, password, contactInfo);

		ResultActions registrationResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/registration")
				.contentType(MediaType.APPLICATION_JSON).content(Objects.requireNonNull(objectToJson(regRequest))));

		// when
		AuthenticationRequest authRequest = new AuthenticationRequest(email, password);
		ResultActions loginResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/auth/login")
				.contentType(MediaType.APPLICATION_JSON).content(Objects.requireNonNull(objectToJson(authRequest))));

		// then
		registrationResultActions.andExpect(status().isOk());
		registrationResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.theId", CoreMatchers.is(1)));
		registrationResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.jwt").isString());

		loginResultActions.andExpect(status().isOk());
		loginResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.theId", CoreMatchers.is(1)));
		loginResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.jwt").isString());

		//
		int userId = 1;
		mockMvc.perform(get("/api/auth/users/{userId}", userId).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
				.andExpect(jsonPath("$.email").value(email));
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