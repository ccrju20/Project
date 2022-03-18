package com.java.springboot.cruddemo.email;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

@Service
public class EmailService implements EmailSender{

    @Autowired
    private JavaMailSender mailSender;

    @Override
    @Async
    public void sendEmail(String to, String email) {
        try{
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");
            helper.setText(email, true);
            helper.setTo(to);
            helper.setSubject("Thank you for registering!");
            helper.setFrom("ccrju19@gmail.com");
            mailSender.send(mimeMessage);
        } catch (MessagingException e) {
            System.out.println("failed to send email");
            throw new IllegalStateException("failed to send email", e);
        }
    }


}
