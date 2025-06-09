package com.example.warehouse.service;

import com.example.warehouse.dto.AuthResponseDto;
import com.example.warehouse.dto.ChangePasswordDto;
import com.example.warehouse.dto.UserCreateRequestDto;
import com.example.warehouse.dto.UserLoginRequestDto;
import org.springframework.http.ResponseEntity;

public interface AuthService {
    ResponseEntity<String> registerNewUser(UserCreateRequestDto requestBody);

    ResponseEntity<String> changePassword(ChangePasswordDto requestBody);

    ResponseEntity<String> login(UserLoginRequestDto requestBody);
}
