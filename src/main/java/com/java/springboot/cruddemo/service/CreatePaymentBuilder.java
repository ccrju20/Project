package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dto.CreatePayment;
import com.java.springboot.cruddemo.dto.CreatePaymentResponse;

public interface CreatePaymentBuilder {

	public CreatePaymentResponse chargeItems(CreatePayment createPayment);
}
