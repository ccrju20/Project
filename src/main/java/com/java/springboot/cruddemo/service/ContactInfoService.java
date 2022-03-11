package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.models.MyUser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.ContactInfoRepository;
import com.java.springboot.cruddemo.entity.ContactInfo;

@Service
public class ContactInfoService {

	private final UserRepository userRepository;
	private final ContactInfoRepository contactInfoRepository;
	
	@Autowired
	public ContactInfoService(ContactInfoRepository theContactInfoRepository, UserRepository theUserRepository) {
		contactInfoRepository = theContactInfoRepository;
		userRepository = theUserRepository;
	}

	public ContactInfo findContactInfo(UUID theId) {
		ContactInfo theContactInfo = userRepository.findContactInfoById(theId);
		if (theContactInfo == null) {
			throw new RuntimeException("User info not found - " + theId);
		}
		return theContactInfo;
	}

	public String findEmailByUuid(UUID id) {
		Optional<MyUser> user = userRepository.findByUuid(id);
		String email = "";

		if (user.isPresent()) {
			email = user.get().getEmail();
		} else {
			throw new RuntimeException("Did not find User id - " + id);
		}

		return email;
	}

	public void save(ContactInfo theContactInfo) {
		contactInfoRepository.save(theContactInfo);
	}

}
