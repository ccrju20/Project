package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ContactInfoRepository;
import com.java.springboot.cruddemo.entity.ContactInfo;

@Service
public class ContactInfoServiceImpl implements ContactInfoService {
	
	private ContactInfoRepository ContactInfoRepository;
	
	@Autowired
	public ContactInfoServiceImpl(ContactInfoRepository theContactInfoRepository) {
		ContactInfoRepository = theContactInfoRepository;
	}

	@Override
	public List<ContactInfo> findAll() {
		return ContactInfoRepository.findAll();
	}

	@Override
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

	@Override
	public void save(ContactInfo theContactInfo) {
		ContactInfoRepository.save(theContactInfo);
	}

	@Override
	public void deleteById(int theId) {
		ContactInfoRepository.deleteById(theId);
	}

}
