package com.example.warehouse.service;

import com.example.warehouse.dto.UserCreateRequestDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<String> registerNewUser(UserCreateRequestDto requestBody);
}
