package com.java.springboot.cruddemo;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;

import javax.mail.Session;
import javax.mail.internet.MimeMessage;

import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;


@Configuration
public class EmailServiceTest {

    @Bean
    public JavaMailSender javaMailSender() {
        JavaMailSender javaMailSender = mock(JavaMailSender.class);
        when(javaMailSender.createMimeMessage()).thenReturn(new MimeMessage((Session) null));
        return javaMailSender;
    }
}
