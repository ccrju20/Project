package com.java.springboot.cruddemo.models;

public class AuthenticationResponse {

	private final String jwt;
	
	private int theId;

	public AuthenticationResponse(String jwt, int theId) {
		this.jwt = jwt;
		this.theId = theId;
	}

	public String getJwt() {
		return jwt;
	}
	
	public int getTheId() {
		return theId;
	}
}
