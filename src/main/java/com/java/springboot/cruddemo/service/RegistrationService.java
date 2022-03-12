package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.payload.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.models.MyUserRole;
import com.java.springboot.cruddemo.payload.RegistrationRequest;

@Service
public class RegistrationService {
	
	@Autowired
	private MyUserDetailsService myUserDetailsService;
	
	public AuthenticationResponse register(RegistrationRequest request) {
		return myUserDetailsService.signUpUser(
				new MyUser(
						request.getEmail(),
						request.getPassword(),
						MyUserRole.USER,
						request.getContactInfo()));
	}
}
