package com.java.springboot.cruddemo.dto;

import java.util.UUID;

public class AuthenticationResponse {

	private String jwt;
	
	private UUID theId;

	public AuthenticationResponse() {

	}

	public AuthenticationResponse(String jwt, UUID theId) {
		this.jwt = jwt;
		this.theId = theId;
	}

	public String getJwt() {
		return jwt;
	}
	
	public UUID getTheId() {
		return theId;
	}
}
