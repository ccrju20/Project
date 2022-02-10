package com.java.springboot.cruddemo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.models.MyUser;

public interface UserRepository extends JpaRepository<MyUser, Integer> {
	
	Optional<MyUser> findByEmail(String email);
	
	@Query("SELECT u.id from MyUser u WHERE u.email = ?1")
	int findIdByEmail(String email);
	
	@Query("SELECT u.contactInfo from MyUser u WHERE u.id = ?1")
	ContactInfo findContactInfoById(int id);
}
