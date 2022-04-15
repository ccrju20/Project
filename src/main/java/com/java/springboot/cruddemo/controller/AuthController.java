package com.java.springboot.cruddemo.controller;

import javax.validation.Valid;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.service.ContactInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.*;

import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.payload.AuthenticationRequest;
import com.java.springboot.cruddemo.payload.AuthenticationResponse;
import com.java.springboot.cruddemo.payload.RegistrationRequest;
import com.java.springboot.cruddemo.service.MyUserDetailsService;
import com.java.springboot.cruddemo.service.RegistrationService;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final MyUserDetailsService userDetailsService;
    private final RegistrationService registrationService;
    private final ContactInfoService contactInfoService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, MyUserDetailsService userDetailsService, RegistrationService registrationService, ContactInfoService contactInfoService) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.registrationService = registrationService;
        this.contactInfoService = contactInfoService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
        AuthenticationResponse authResponse =
                userDetailsService.authenticate(authenticationManager, authenticationRequest.getUsername(), authenticationRequest.getPassword());

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/registration")
    public ResponseEntity<?> register(@Valid @RequestBody RegistrationRequest request) {
        AuthenticationResponse response = registrationService.register(request);

        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @GetMapping("/users/{userId}")
    public MyUser getUser(@PathVariable int userId) {
        MyUser user = userDetailsService.findUserById(userId);

        return user;
    }

    @DeleteMapping("/users/{userId}")
    public String deleteUser(@PathVariable int userId) {
        userDetailsService.deleteUserById(userId);

        return "Deleted User id - " + userId;
    }

    @GetMapping("/contactinfo/{userId}")
    public ContactInfo getContactInfo(@PathVariable UUID userId) {
        return contactInfoService.findContactInfo(userId);
    }

    @PutMapping("/contactinfo")
    public ContactInfo updateContactInfo(@RequestBody ContactInfo theContactInfo) {
        contactInfoService.saveContactInfo(theContactInfo);

        return theContactInfo;
    }

    @GetMapping("/users")
    public List<MyUser> getAllUsers() {
        return userDetailsService.getAllUsers();
    }
}
