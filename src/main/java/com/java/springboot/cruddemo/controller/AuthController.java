package com.java.springboot.cruddemo.controller;

import javax.validation.Valid;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.service.ContactInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.payload.AuthenticationRequest;
import com.java.springboot.cruddemo.payload.AuthenticationResponse;
import com.java.springboot.cruddemo.payload.RegistrationRequest;
import com.java.springboot.cruddemo.service.MyUserDetailsService;
import com.java.springboot.cruddemo.service.RegistrationService;
import com.java.springboot.cruddemo.util.JwtUtil;

import java.util.UUID;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final MyUserDetailsService userDetailsService;
    private final RegistrationService registrationService;
    private final JwtUtil jwtTokenUtil;
    private final ContactInfoService contactInfoService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, MyUserDetailsService userDetailsService, RegistrationService registrationService, JwtUtil jwtTokenUtil, ContactInfoService contactInfoService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.registrationService = registrationService;
        this.jwtTokenUtil = jwtTokenUtil;
        this.contactInfoService = contactInfoService;

    }

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

        UUID theId = userDetailsService.findUUIDByUsername(authenticationRequest.getUsername());

        return ResponseEntity.ok(new AuthenticationResponse(jwt, theId));
    }

    @PostMapping("/registration")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {
        String response = registrationService.register(request);

        if (response.startsWith("Error")) {
            return ResponseEntity.badRequest().body(response);
        }

        UUID theId = userDetailsService.findUUIDByUsername(request.getEmail());

        return new ResponseEntity<>(new AuthenticationResponse(response, theId), HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}")
    public MyUser getUser(@PathVariable int userId) {

        MyUser user = userDetailsService.findById(userId);

        return user;
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable int userId) {

        userDetailsService.deleteById(userId);

        return "Deleted User ID - " + userId;
    }

	@GetMapping("/contactinfo/{userId}")
	public ContactInfo getContactInfo(@PathVariable UUID userId) {
		ContactInfo contactInfo = contactInfoService.findContactInfo(userId);

		return contactInfo;
	}

	@PutMapping("/contactinfo")
	public ContactInfo updateContactInfo(@RequestBody ContactInfo theContactInfo) {

		contactInfoService.save(theContactInfo);

		return theContactInfo;
	}


}
