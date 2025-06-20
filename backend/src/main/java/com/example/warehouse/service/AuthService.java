package com.example.warehouse.service;

import com.example.warehouse.dto.*;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface AuthService {
    ResponseEntity<String> registerNewUser(UserCreateRequestDto requestBody);

    ResponseEntity<String> changePassword(ChangePasswordDto requestBody);

    ResponseEntity<String> login(UserLoginRequestDto requestBody);

    ResponseEntity<List<UserDto>> getAllActiveUsers();
}
