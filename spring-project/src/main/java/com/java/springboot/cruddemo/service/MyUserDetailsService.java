package com.java.springboot.cruddemo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.util.JwtUtil;

@Service
public class MyUserDetailsService implements UserDetailsService {

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	private JwtUtil jwtTokenUtil;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		return userRepository.findByEmail(username)
				.orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
	}
	
	public String signUpUser(MyUser myUser) {
		boolean userExists = userRepository
				.findByEmail(myUser.getEmail())
				.isPresent();
		
		if (userExists) {
//			throw new IllegalStateException("Email already taken");
			return "Error: Email already taken";
		}
		
		myUser.setCreatedAt();
		
		String encodedPassword = bCryptPasswordEncoder.encode(myUser.getPassword());
		
		myUser.setPassword(encodedPassword);
		
		userRepository.save(myUser);
		
		String jwt = jwtTokenUtil.generateToken(myUser);

		return jwt;
	}
	
}
