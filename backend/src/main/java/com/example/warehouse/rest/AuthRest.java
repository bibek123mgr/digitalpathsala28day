package com.example.warehouse.rest;

import com.example.warehouse.dto.UserCreateRequestDto;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api/v1/auth")
public interface AuthRest {

    @PostMapping("/register-new-user")
    public ResponseEntity<String> registerNewUser(@RequestBody UserCreateRequestDto requestBody);
}
