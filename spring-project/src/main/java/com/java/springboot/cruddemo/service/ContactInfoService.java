package com.java.springboot.cruddemo.service;

import java.util.List;

import com.java.springboot.cruddemo.entity.ContactInfo;

public interface ContactInfoService {
	
	public List<ContactInfo> findAll();
	
	public ContactInfo findById(int theId);
	
	public void save(ContactInfo theContactInfo);
	
	public void deleteById(int theId);
	
}
