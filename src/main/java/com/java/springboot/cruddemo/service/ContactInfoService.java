package com.java.springboot.cruddemo.service;

import java.util.*;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
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
    public ContactInfoService(ContactInfoRepository contactInfoRepository, UserRepository userRepository) {
        this.contactInfoRepository = contactInfoRepository;
        this.userRepository = userRepository;
    }

    public Map<String, String> findContactInfo(UUID theId) {
        ContactInfo theContactInfo = userRepository.findContactInfoById(theId);
        if (theContactInfo == null) {
            throw new ObjectNotFoundException("User uuid not found - " + theId);
        }
        Optional<MyUser> user = userRepository.findByUuid(theId);

        // returning a map since email field is in MyUser object and not ContactInfo
        Map<String, String> hm = new HashMap<>();
        hm.put("email", user.get().getEmail());
        hm.put("firstname", theContactInfo.getFirstname());
        hm.put("lastname", theContactInfo.getLastname());
        hm.put("phone", theContactInfo.getPhone());
        hm.put("address", theContactInfo.getAddress());
        hm.put("addresstwo", theContactInfo.getAddresstwo());
        hm.put("city", theContactInfo.getCity());
        hm.put("state", theContactInfo.getState());
        hm.put("postal", theContactInfo.getPostal());

        return hm;
    }

    public void saveContactInfo(ContactInfo theContactInfo) {
        contactInfoRepository.save(theContactInfo);
    }

}
