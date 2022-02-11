package com.java.springboot.cruddemo.dao;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import java.util.Optional;

import javax.validation.ConstraintViolationException;

import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.models.MyUserRole;

@DataJpaTest
@TestMethodOrder(OrderAnnotation.class)
class UserRepositoryTest {
	
	@Autowired
	private UserRepository underTest;
	
	@Test
	@Order(1)
	void itShouldSaveUser() {
		// given
		ContactInfo info = new ContactInfo("First", "Last");
		MyUser user = new MyUser("test@gmail.com", "password", MyUserRole.USER, info);
		
		// when
		underTest.save(user);
		
		// then
		Optional<MyUser> theUser = underTest.findById(1);
		assertThat(theUser).isPresent()
		.hasValueSatisfying(u -> {
			assertThat(u).isEqualTo(user);
		});
	}
	
	@Test
	void itShouldNotSaveUserIfEmailIsNull() {
		// given
		ContactInfo info = new ContactInfo("First", "Last");
		MyUser user = new MyUser(null, "password", MyUserRole.USER, info);
		
		// when		
		// then
		assertThatThrownBy(() -> underTest.save(user))
		.isInstanceOf(ConstraintViolationException.class);
	}
	
	@Test
	void itShouldNotSaveUserIfPasswordIsNull() {
		// given
		ContactInfo info = new ContactInfo("First", "Last");
		MyUser user = new MyUser("test@gmail.com", null, MyUserRole.USER, info);
		
		// when		
		// then
		assertThatThrownBy(() -> underTest.save(user))
		.isInstanceOf(ConstraintViolationException.class);
	}
	
	@Test
	void itShouldFindUserByEmail() {
		// given
		ContactInfo info = new ContactInfo("Second", "Last");
		MyUser user = new MyUser("test2@gmail.com", "password", MyUserRole.USER, info);
		
		// when
		underTest.save(user);
		
		// then
		Optional<MyUser> theUser = underTest.findByEmail("test2@gmail.com");
		
		assertThat(theUser).isEqualTo(Optional.of(user));
	}

}
