package com.java.springboot.cruddemo.payload;

import javax.validation.constraints.NotNull;

import com.java.springboot.cruddemo.entity.ContactInfo;

public class RegistrationRequest {

	@NotNull
	private String email;

	@NotNull
	private String password;

	private ContactInfo contactInfo;

	public RegistrationRequest() {

	}

	public RegistrationRequest(String email, String password, ContactInfo contactInfo) {
		this.email = email;
		this.password = password;
		this.contactInfo = contactInfo;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public ContactInfo getContactInfo() {
		return contactInfo;
	}

}
