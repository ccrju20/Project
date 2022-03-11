package com.java.springboot.cruddemo.dao;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.models.MyUser;

public interface UserRepository extends JpaRepository<MyUser, Integer> {
	
	Optional<MyUser> findByEmail(String email);
	Optional<MyUser> findByUuid(UUID id);

	@Query("SELECT u.uuid from MyUser u WHERE u.email = ?1")
	UUID findUUIDByEmail(String email);
	
	@Query("SELECT u.contactInfo from MyUser u WHERE u.uuid = ?1")
	ContactInfo findContactInfoById(UUID id);


}
