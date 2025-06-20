package com.example.warehouse.rest;

import com.example.warehouse.dto.*;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1")
public interface AuthRest {

    @PostMapping("/users")
    ResponseEntity<String> registerNewUser(@Valid @RequestBody UserCreateRequestDto requestBody);

    @PostMapping("/auth/login")
    ResponseEntity<String> login(@Valid @RequestBody UserLoginRequestDto requestBody);

    @GetMapping("/users")
    ResponseEntity<List<UserDto>> getAllActiveUsers();

    @PostMapping("/auth/change-password")
    ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordDto requestBody);
}
