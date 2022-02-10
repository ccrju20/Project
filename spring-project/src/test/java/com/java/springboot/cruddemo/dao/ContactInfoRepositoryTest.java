package com.java.springboot.cruddemo.dao;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.java.springboot.cruddemo.entity.ContactInfo;

@DataJpaTest
class ContactInfoRepositoryTest {
	
	@Autowired
	ContactInfoRepository underTest;

	@Test
	void itShouldSaveContactInfo() {
		// given
		ContactInfo info = new ContactInfo("First", "Last", "test@gmail.com", "", "", "",
				"", "", "");
		
		// when
		underTest.save(info);
		
		// then
		Optional<ContactInfo> contactinfo = underTest.findById(1);
		assertThat(contactinfo).isPresent().hasValueSatisfying(c -> {
			assertThat(c).isEqualTo(info);
		});
	}

}
