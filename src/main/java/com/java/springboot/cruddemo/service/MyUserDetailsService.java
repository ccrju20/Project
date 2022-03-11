package com.java.springboot.cruddemo.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.util.JwtUtil;

@Service
public class MyUserDetailsService implements UserDetailsService {

	private final UserRepository userRepository;

	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	private final JwtUtil jwtTokenUtil;
	
	@Autowired
	public MyUserDetailsService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtUtil jwtTokenUtil) {
		this.userRepository = userRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
		this.jwtTokenUtil = jwtTokenUtil;
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
	}

	public String signUpUser(MyUser myUser) {
		boolean userExists = userRepository.findByEmail(myUser.getEmail()).isPresent();
		if (userExists) {
//			throw new IllegalStateException("Email already taken");
			return "Error: Email already taken";
		}

		myUser.setCreatedAt();
		myUser.setUuid(UUID.randomUUID());

		String encodedPassword = bCryptPasswordEncoder.encode(myUser.getPassword());
		myUser.setPassword(encodedPassword);

		userRepository.save(myUser);

		String jwt = jwtTokenUtil.generateToken(myUser);

		return jwt;
	}

	public MyUser findById(int theId) {
		Optional<MyUser> user = userRepository.findById(theId);

		MyUser theUser = null;

		if (user.isPresent()) {
			theUser = user.get();
		} else {
			throw new RuntimeException("Did not find User id - " + theId);
		}

		return theUser;
	}
	
	public UUID findUUIDByUsername(String username) {
		return userRepository.findUUIDByEmail(username);
	}

	public void deleteById(int theId) {
		Optional<MyUser> user = userRepository.findById(theId);

		if (user.isPresent()) {
			userRepository.deleteById(theId);
		} else {
			throw new RuntimeException("Did not find User id - " + theId);
		}
	}
}
