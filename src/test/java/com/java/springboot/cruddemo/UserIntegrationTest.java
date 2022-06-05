package com.java.springboot.cruddemo;

import static org.junit.jupiter.api.Assertions.fail;
import static org.mockito.Mockito.mock;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.Objects;

import com.java.springboot.cruddemo.dto.AuthenticationResponse;
import com.java.springboot.cruddemo.entity.MyUser;
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
import com.java.springboot.cruddemo.dto.AuthenticationRequest;
import com.java.springboot.cruddemo.dto.RegistrationRequest;

@SpringBootTest
@AutoConfigureMockMvc
public class UserIntegrationTest {

	@Autowired
	private MockMvc mockMvc;

	@Test
	void itShouldLogUserInAfterRegistration() throws Exception {
		// given
		String email = "test@test.com";
		String password = "password";
		ContactInfo contactInfo = new ContactInfo("Test", "User");
		RegistrationRequest regRequest = new RegistrationRequest(email, password, contactInfo);

		ResultActions registrationResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/registration")
				.contentType(MediaType.APPLICATION_JSON).content(Objects.requireNonNull(objectToJson(regRequest))));

		String registeredUser = registrationResultActions.andReturn().getResponse().getContentAsString();
		AuthenticationResponse regResponse = new ObjectMapper().readValue(registeredUser, AuthenticationResponse.class);
		String regUuid = regResponse.getTheId().toString();

		// when login
		AuthenticationRequest authRequest = new AuthenticationRequest(email, password);
		ResultActions loginResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login")
				.contentType(MediaType.APPLICATION_JSON).content(Objects.requireNonNull(objectToJson(authRequest))));

		// then
		registrationResultActions.andExpect(status().isCreated());
		registrationResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.theId", CoreMatchers.is(regUuid)));
		registrationResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.jwt").isString());

		loginResultActions.andExpect(status().isOk());
		loginResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.theId", CoreMatchers.is(regUuid)));
		loginResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.jwt").isString());

		//
		mockMvc.perform(get("/api/v1/auth/users/{userId}", regUuid).accept(MediaType.APPLICATION_JSON))
				.andExpect(status().isOk())
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
