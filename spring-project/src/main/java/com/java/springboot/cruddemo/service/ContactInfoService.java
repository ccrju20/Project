package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ContactInfoRepository;
import com.java.springboot.cruddemo.entity.ContactInfo;

@Service
public class ContactInfoService {
	
	private ContactInfoRepository ContactInfoRepository;
	
	@Autowired
	public ContactInfoService(ContactInfoRepository theContactInfoRepository) {
		ContactInfoRepository = theContactInfoRepository;
	}

	public List<ContactInfo> findAll() {
		return ContactInfoRepository.findAll();
	}

	public ContactInfo findById(int theId) {
		Optional<ContactInfo> result = ContactInfoRepository.findById(theId);
		
		ContactInfo theContactInfo = null;
		
		if (result.isPresent()) {
			theContactInfo = result.get();
		}
		else {
			throw new RuntimeException("Did not find ContactInfo id - " + theId);
		}
		return theContactInfo;
	}

	public void save(ContactInfo theContactInfo) {
		ContactInfoRepository.save(theContactInfo);
	}

	public void deleteById(int theId) {
		ContactInfoRepository.deleteById(theId);
	}

}
