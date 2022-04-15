package com.java.springboot.cruddemo.service;

import java.util.List;
import java.util.UUID;

import com.java.springboot.cruddemo.email.EmailSender;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
import com.java.springboot.cruddemo.exception.UsernameExistsException;
import com.java.springboot.cruddemo.payload.AuthenticationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
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

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JwtUtil jwtTokenUtil;
    private final EmailSender emailSender;

    @Autowired
    public MyUserDetailsService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JwtUtil jwtTokenUtil, EmailSender emailSender) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtTokenUtil = jwtTokenUtil;
        this.emailSender = emailSender;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));
    }

    public AuthenticationResponse authenticate(AuthenticationManager authenticationManager, String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            throw new Exception("Incorrect username or password", e);
        }

        UserDetails userDetails = userRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("Not found: " + username));

        String jwt = jwtTokenUtil.generateToken(userDetails);
        UUID theId = userRepository.findUUIDByEmail(username);

        return new AuthenticationResponse(jwt, theId);
    }

    public AuthenticationResponse signUpUser(MyUser myUser) {
       if (userRepository.findByEmail(myUser.getEmail()).isPresent()) {
            throw new UsernameExistsException(String.format("Username %s already taken", myUser.getEmail()));
       }

        myUser.setCreatedAt();
        myUser.setUuid(UUID.randomUUID());
        String encodedPassword = bCryptPasswordEncoder.encode(myUser.getPassword());
        myUser.setPassword(encodedPassword);

        userRepository.save(myUser);
        String jwt = jwtTokenUtil.generateToken(myUser);

        emailSender.sendEmail(myUser.getEmail(), myUser.getContactInfo().getFirstname());

        return new AuthenticationResponse(jwt, myUser.getUuid());
    }

    public MyUser findUserById(int theId) {
        MyUser user = userRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find User id " + theId));

        return user;
    }

    public void deleteUserById(int theId) {
        userRepository.findById(theId)
                .orElseThrow(() -> new ObjectNotFoundException("Did not find User id " + theId));

        userRepository.deleteById(theId);
    }

    public List<MyUser> getAllUsers() {
        return userRepository.findAll();
    }

}
