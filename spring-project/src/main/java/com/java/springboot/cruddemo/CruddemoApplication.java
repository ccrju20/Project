package com.java.springboot.cruddemo;

import javax.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.stripe.Stripe;

@SpringBootApplication
@EnableJpaRepositories(basePackageClasses = UserRepository.class)
public class CruddemoApplication {

	@Value("${stripe.api.key}")
	private String stripeSecretKey;
	
	@PostConstruct
	public void setup() {
		Stripe.apiKey = stripeSecretKey;
	}
	
	public static void main(String[] args) {
		SpringApplication.run(CruddemoApplication.class, args);
	}

}
