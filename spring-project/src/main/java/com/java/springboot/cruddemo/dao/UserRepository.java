package com.java.springboot.cruddemo.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.java.springboot.cruddemo.models.MyUser;

public interface UserRepository extends JpaRepository<MyUser, Integer> {
	
	Optional<MyUser> findByEmail(String email);
	
	@Query("SELECT u.id from MyUser u WHERE u.email = ?1")
	int findIdByEmail(String email);
	
}
