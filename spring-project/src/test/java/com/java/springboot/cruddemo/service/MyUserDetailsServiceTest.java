package com.java.springboot.cruddemo.service;

import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.never;
import static org.mockito.ArgumentMatchers.any;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.models.MyUserRole;
import com.java.springboot.cruddemo.util.JwtUtil;

class MyUserDetailsServiceTest {
	
	@Mock
	private UserRepository userRepository;
	
	@Mock
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Mock
	private JwtUtil jwtTokenUtil;
	
	private MyUserDetailsService underTest;
	
	@Captor
	private ArgumentCaptor<MyUser> myUserArgumentCaptor;
	
	@BeforeEach
	void setUp() {
		MockitoAnnotations.openMocks(this);
		underTest = new MyUserDetailsService(userRepository, bCryptPasswordEncoder, jwtTokenUtil);
	}

	@Test
	void itShouldSaveNewUser() {
		// given
		String email = "test@gmail.com";
		ContactInfo info = new ContactInfo();
		MyUser user = new MyUser("test@gmail.com", "password", MyUserRole.USER, info);
		
		given(userRepository.findByEmail(email)).willReturn(Optional.empty());
		
		// when
		underTest.signUpUser(user);
		
		// then
		then(userRepository).should().save(myUserArgumentCaptor.capture());
		MyUser myUserArgumentCaptorValue = myUserArgumentCaptor.getValue();
		assertThat(myUserArgumentCaptorValue).isEqualTo(user);
	}
	
	@Test
	void itShouldNotSaveNewUserIfUserExists() {
		// given
		String email = "test@gmail.com";
		ContactInfo info = new ContactInfo();
		MyUser user = new MyUser("test@gmail.com", "password", MyUserRole.USER, info);
				
		given(userRepository.findByEmail(email)).willReturn(Optional.of(user));
		
		// when
		underTest.signUpUser(user);
		
		// then
		then(userRepository).should(never()).save(any());
	}
	
	@Test
	void itShouldFindExistingUserById() {
		// given
		int theId = 1;
		
		ContactInfo info = new ContactInfo();
		MyUser user = new MyUser("test@gmail.com", "password", MyUserRole.USER, info);
		
		given(userRepository.findById(theId)).willReturn(Optional.of(user));
		
		// when
		underTest.findById(theId);
		
		// then
		then(userRepository).should().findById(theId);
	}
	
	@Test
	void itShouldThrowIfUserDoesNotExist() {
		// given
		int theId = 1;
		given(userRepository.findById(theId)).willReturn(Optional.empty());
		
		// when
		assertThatThrownBy(() -> underTest.findById(theId))
		.isInstanceOf(RuntimeException.class)
		.hasMessageContaining("Did not find User id - " + theId);
		
		// then
		then(userRepository).should(never()).getOne(theId);
	}

}
