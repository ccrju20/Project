package com.java.springboot.cruddemo.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.java.springboot.cruddemo.entity.ContactInfo;

public interface ContactInfoRepository extends JpaRepository<ContactInfo, Integer> {
	
}
