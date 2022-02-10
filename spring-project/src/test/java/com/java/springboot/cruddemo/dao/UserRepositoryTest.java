package com.java.springboot.cruddemo.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.models.MyUser;
import com.java.springboot.cruddemo.models.MyUserRole;

@DataJpaTest
class UserRepositoryTest {
	
	@Autowired
	private UserRepository underTest;
	
	@Test
	void itShouldSaveUser() {
		// given
		ContactInfo info = new ContactInfo();
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

}
