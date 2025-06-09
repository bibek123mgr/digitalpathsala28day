package com.example.warehouse.utils;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

public class WASUtils {

    private WASUtils(){}

    public static ResponseEntity<String> getResponse(String message, HttpStatus status){
        return new ResponseEntity<>("{\"message\":\""+message+"\"}",status);
    }
}
