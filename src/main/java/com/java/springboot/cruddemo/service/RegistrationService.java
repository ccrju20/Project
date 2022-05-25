package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dto.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.entity.MyUser;
import com.java.springboot.cruddemo.entity.MyUserRole;
import com.java.springboot.cruddemo.dto.RegistrationRequest;

@Service
public class RegistrationService {

	private final MyUserDetailsService myUserDetailsService;

	@Autowired
	public RegistrationService(MyUserDetailsService myUserDetailsService) {
		this.myUserDetailsService = myUserDetailsService;
	}

	public AuthenticationResponse register(RegistrationRequest request) {
		return myUserDetailsService.signUpUser(
				new MyUser(
						request.getEmail(),
						request.getPassword(),
						MyUserRole.USER,
						request.getContactInfo()));
	}
}
