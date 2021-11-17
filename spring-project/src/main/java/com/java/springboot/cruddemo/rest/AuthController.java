package com.java.springboot.cruddemo.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.models.AuthenticationRequest;
import com.java.springboot.cruddemo.models.AuthenticationResponse;
import com.java.springboot.cruddemo.models.RegistrationRequest;
import com.java.springboot.cruddemo.service.MyUserDetailsService;
import com.java.springboot.cruddemo.service.RegistrationService;
import com.java.springboot.cruddemo.util.JwtUtil;

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
		
		return ResponseEntity.ok(new AuthenticationResponse(jwt));
	}
	
//	@PostMapping("/registration")
//	public String register (@RequestBody RegistrationRequest request) {
//		return registrationService.register(request);
//	}
	
	@PostMapping("/registration")
	public ResponseEntity<?> register(@RequestBody RegistrationRequest request) {
		final String response = registrationService.register(request);
		
		if (response.startsWith("Error")) {
			return ResponseEntity.badRequest().body(response);
		}
		
		return ResponseEntity.ok(new AuthenticationResponse(response));
	}

}
