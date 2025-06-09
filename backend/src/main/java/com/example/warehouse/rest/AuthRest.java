package com.example.warehouse.rest;

import com.example.warehouse.dto.AuthResponseDto;
import com.example.warehouse.dto.UserCreateRequestDto;
import com.example.warehouse.dto.ChangePasswordDto;
import com.example.warehouse.dto.UserLoginRequestDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/v1/auth")
public interface AuthRest {

    @PostMapping("/register-new-user")
    ResponseEntity<String> registerNewUser(@Valid @RequestBody UserCreateRequestDto requestBody);

    @PostMapping("/login")
    ResponseEntity<String> login(@Valid @RequestBody UserLoginRequestDto requestBody);

    @PostMapping("/change-password")
    ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordDto requestBody);
}
