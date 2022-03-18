package com.java.springboot.cruddemo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class UsernameExistsException extends AuthenticationException {

    public UsernameExistsException(String msg) {
        super(msg);
    }
}
