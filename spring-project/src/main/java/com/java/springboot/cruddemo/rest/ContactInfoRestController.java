package com.java.springboot.cruddemo.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.service.ContactInfoService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api")
public class ContactInfoRestController {

	private ContactInfoService contactInfoService;

	@Autowired
	public ContactInfoRestController(ContactInfoService theContactInfoService) {
		contactInfoService = theContactInfoService;
	}

	@GetMapping("/contactinfo")
	public List<ContactInfo> findAll() {
		return contactInfoService.findAll();
	}

	@GetMapping("/Contactinfos/{contactInfoId}")
	public ContactInfo getContactInfo(@PathVariable int contactInfoId) {

		ContactInfo theContactInfo = contactInfoService.findById(contactInfoId);

		if (theContactInfo == null) {
			throw new RuntimeException("ContactInfo id not found - " + contactInfoId);
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

	@DeleteMapping("contactInfo/{contactInfoId}")
	public String deleteContactInfo(@PathVariable int contactInfoId) {

		ContactInfo tempContactInfo = contactInfoService.findById(contactInfoId);

		if (tempContactInfo == null) {
			throw new RuntimeException("ContactInfo id not found - " + contactInfoId);
		}

		contactInfoService.deleteById(contactInfoId);

		return "Deleted ContactInfo id - " + contactInfoId;
	}

}
