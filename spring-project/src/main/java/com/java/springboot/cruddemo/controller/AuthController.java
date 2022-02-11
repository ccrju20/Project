package com.java.springboot.cruddemo.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.payload.AuthenticationRequest;
import com.java.springboot.cruddemo.payload.AuthenticationResponse;
import com.java.springboot.cruddemo.payload.RegistrationRequest;
import com.java.springboot.cruddemo.service.MyUserDetailsService;
import com.java.springboot.cruddemo.service.RegistrationService;
import com.java.springboot.cruddemo.util.JwtUtil;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private MyUserDetailsService userDetailsService;
	
	@Autowired
	private RegistrationService registrationService;
	
	@Autowired
	private JwtUtil jwtTokenUtil;

	@PostMapping("/login")
	public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		try {
			authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
		} catch (BadCredentialsException e) {
				throw new Exception("Incorrect username or password", e);
			}
		
		final UserDetails userDetails = userDetailsService
				.loadUserByUsername(authenticationRequest.getUsername());
		
		final String jwt = jwtTokenUtil.generateToken(userDetails);
		
		int theId = userDetailsService.findIdByUsername(authenticationRequest.getUsername());
		
		return ResponseEntity.ok(new AuthenticationResponse(jwt, theId));
	}
	
	@PostMapping("/registration")
	public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {
		final String response = registrationService.register(request);
		
		if (response.startsWith("Error")) {
			return ResponseEntity.badRequest().body(response);
		}
		
		int theId = userDetailsService.findIdByUsername(request.getEmail());
		
		return ResponseEntity.ok(new AuthenticationResponse(response, theId));
	}
	
	@GetMapping("/users/{userId}")
	public MyUser getOrder(@PathVariable int userId) {

		MyUser user = userDetailsService.findById(userId);;

		return user;
	}
	
	@DeleteMapping("/users/{userId}")
	public String deleteOrder(@PathVariable int userId) {

		MyUser user = userDetailsService.findById(userId);;

		userDetailsService.deleteById(userId);
		
		return "Deleted User ID - " + userId;
	}

}
