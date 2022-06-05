package com.java.springboot.cruddemo;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.java.springboot.cruddemo.dto.AuthenticationResponse;
import com.java.springboot.cruddemo.entity.*;
import com.java.springboot.cruddemo.entity.MyUser;
import com.java.springboot.cruddemo.dto.AuthenticationRequest;
import com.java.springboot.cruddemo.dto.RegistrationRequest;
import org.hamcrest.CoreMatchers;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class OrderIntegrationTest {
    @Autowired
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    void itShouldGetOrderAfterPlacing() throws Exception {
        // given
        List<OrderItem> orderItems = new ArrayList<>();
        OrderDetails orderDetails = new OrderDetails("first", "last", "test@gmail.com", "1111111111");
        Order order = new Order("ordernumber", LocalDateTime.now(), "scheduled", OrderStatus.PENDING, 0, UUID.randomUUID(),
                orderItems, orderDetails);
        // when
        ResultActions orderResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/orders")
                .contentType(MediaType.APPLICATION_JSON).content(Objects.requireNonNull(objectToJson(order))));

        // then
        int orderId = 1;
        orderResultActions.andExpect(status().isCreated());
        orderResultActions.andExpect(MockMvcResultMatchers.jsonPath("$.id", CoreMatchers.is(orderId)));

        //
        mockMvc.perform(get("/api/v1/orders/{orderId}", orderId).accept(MediaType.APPLICATION_JSON)).andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void itShouldGetOrdersForAuthenticatedUser() throws Exception {
        // given
        String email = "test@gmail.com";

        // user registers
        RegistrationRequest regRequest = new RegistrationRequest(email, "password", new ContactInfo("first", "last"));
        mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/registration").contentType(MediaType.APPLICATION_JSON)
                .content(Objects.requireNonNull(objectToJson(regRequest))));

        // user logs in
        AuthenticationRequest authRequest = new AuthenticationRequest(email, "password");
        ResultActions loginResult = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/auth/login").contentType(MediaType.APPLICATION_JSON)
                .content(Objects.requireNonNull(objectToJson(authRequest)))).andExpect(status().isOk());

        String loggedUser = loginResult.andReturn().getResponse().getContentAsString();
        AuthenticationResponse regResponse = new ObjectMapper().readValue(loggedUser, AuthenticationResponse.class);
        String regUuid = regResponse.getTheId().toString();

        // get user
        String theUser = mockMvc.perform(get("/api/v1/auth/users/{userId}", regUuid).accept(MediaType.APPLICATION_JSON)).andReturn()
                .getResponse().getContentAsString();
        MyUser account = new ObjectMapper().readValue(theUser, MyUser.class);

        // user places order
        Order order = new Order("ordernumber", LocalDateTime.now(), "scheduled", OrderStatus.PENDING, 0, account.getUuid(),
                new ArrayList<OrderItem>(), new OrderDetails("first", "last", email, "1111111111"));

        ResultActions orderResultActions = mockMvc.perform(MockMvcRequestBuilders.post("/api/v1/orders").contentType(MediaType.APPLICATION_JSON)
                .content(Objects.requireNonNull(objectToJson(order))));

        orderResultActions.andExpect(status().isCreated());

        // when
        // then
        mockMvc.perform(MockMvcRequestBuilders.get("/api/v1/orders/account/{accountUuid}", account.getUuid())
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
