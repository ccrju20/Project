package com.java.springboot.cruddemo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class ObjectRetrievalException extends RuntimeException {
    public ObjectRetrievalException(String msg) {
        super(msg);
    }
}