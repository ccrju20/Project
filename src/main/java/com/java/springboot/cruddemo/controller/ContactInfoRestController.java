package com.java.springboot.cruddemo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.service.ContactInfoService;
import com.java.springboot.cruddemo.service.MyUserDetailsService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContactInfoRestController {

	private ContactInfoService contactInfoService;

	private MyUserDetailsService userDetailsService;

	@Autowired
	public ContactInfoRestController(ContactInfoService theContactInfoService, MyUserDetailsService theUserDetailsService) {
		contactInfoService = theContactInfoService;
		userDetailsService = theUserDetailsService;
	}

	@GetMapping("/contactinfo")
	public List<ContactInfo> findAll() {
		return contactInfoService.findAll();
	}
	
	@GetMapping("/contactinfo/{userId}")
	public ContactInfo getContactInfo(@PathVariable int userId) {
		
		ContactInfo theContactInfo = userDetailsService.findContactInfo(userId);

		if (theContactInfo == null) {
			throw new RuntimeException("User info not found - " + userId);
		}

		return theContactInfo;
	}
	
	@PostMapping("/contactinfo")
	public ContactInfo addContactInfo(@RequestBody ContactInfo theContactInfo) {
		
		theContactInfo.setId(0);
		
		contactInfoService.save(theContactInfo);

		return theContactInfo;
	}

	@PutMapping("/contactinfo")
	public ContactInfo updateContactInfo(@RequestBody ContactInfo theContactInfo) {

		contactInfoService.save(theContactInfo);

		return theContactInfo;
	}

//	@DeleteMapping("contactInfo/{contactInfoId}")
//	public String deleteContactInfo(@PathVariable int contactInfoId) {
//
//		ContactInfo tempContactInfo = contactInfoService.findById(contactInfoId);
//
//		if (tempContactInfo == null) {
//			throw new RuntimeException("ContactInfo id not found - " + contactInfoId);
//		}
//
//		contactInfoService.deleteById(contactInfoId);
//
//		return "Deleted ContactInfo id - " + contactInfoId;
//	}

}
