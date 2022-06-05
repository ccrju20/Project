package com.java.springboot.cruddemo.service;

import com.java.springboot.cruddemo.dao.UserRepository;
import com.java.springboot.cruddemo.email.EmailSender;
import com.java.springboot.cruddemo.entity.ContactInfo;
import com.java.springboot.cruddemo.exception.ObjectNotFoundException;
import com.java.springboot.cruddemo.exception.UsernameExistsException;
import com.java.springboot.cruddemo.entity.MyUser;
import com.java.springboot.cruddemo.entity.MyUserRole;
import com.java.springboot.cruddemo.util.JwtUtil;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.BDDMockito.then;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.never;

class MyUserDetailsServiceTest {
    @Mock
    private UserRepository userRepository;

    @Mock
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Mock
    private JwtUtil jwtTokenUtil;

    @Mock
    private EmailSender emailSender;

    private MyUserDetailsService underTest;

    @Captor
    private ArgumentCaptor<MyUser> myUserArgumentCaptor;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        underTest = new MyUserDetailsService(userRepository, bCryptPasswordEncoder, jwtTokenUtil, emailSender);
    }

    @Test
    void itShouldSaveNewUser() {
        // given
        String email = "test@gmail.com";
        ContactInfo info = new ContactInfo();
        MyUser user = new MyUser("test@gmail.com", "password", MyUserRole.USER, info);

        given(userRepository.findByEmail(email)).willReturn(Optional.empty());
        doNothing().when(emailSender).sendEmail("email", "firstname");

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
        MyUser user = new MyUser(email, "password", MyUserRole.USER, info);

        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));

        // when
        // then
        assertThatThrownBy(() -> underTest.signUpUser(user))
                .isInstanceOf(UsernameExistsException.class)
                .hasMessageContaining(String.format("Username %s already taken", email));

        then(userRepository).should(never()).save(any());
    }

    @Test
    void itShouldFindExistingUserById() {
        // given
        UUID theId = UUID.fromString("d983d59f-8ba6-4863-818a-5a984ef46f79");
        ContactInfo info = new ContactInfo();
        MyUser user = new MyUser("test@gmail.com", "password", MyUserRole.USER, info);

        given(userRepository.findByUuid(theId)).willReturn(Optional.of(user));

        // when
        underTest.findUserById(theId);

        // then
        then(userRepository).should().findByUuid(theId);
        Optional<MyUser> theUser = userRepository.findByUuid(theId);
        assertThat(theUser).isEqualTo(Optional.of(user));
    }

    @Test
    void itShouldThrowIfUserDoesNotExist() {
        // given
        UUID theId = UUID.fromString("00000000-0000-0000-0000-000000000000");
        given(userRepository.findByUuid(theId)).willReturn(Optional.empty());

        // when
        // then
        assertThatThrownBy(() -> underTest.findUserById(theId))
                .isInstanceOf(ObjectNotFoundException.class)
                .hasMessageContaining("Did not find User id " + theId);
    }

    @Test
    void itShouldLoadUserByEmail() {
        // given
        String email = "test@gmail.com";
        MyUser user = new MyUser(email, "password", MyUserRole.USER, new ContactInfo());

        given(userRepository.findByEmail(email)).willReturn(Optional.of(user));

        // when
        underTest.loadUserByUsername(email);

        // then
        then(userRepository).should().findByEmail(email);
    }

    @Test
    void itShouldNotLoadUserByEmail() {
        // given
        String email = "test@gmail.com";
        given(userRepository.findByEmail(email)).willReturn(Optional.empty());

        // when
        // then
        assertThatThrownBy(() -> underTest.loadUserByUsername(email))
                .isInstanceOf(UsernameNotFoundException.class)
                .hasMessage(String.format("Not found: %s", email));
    }

}