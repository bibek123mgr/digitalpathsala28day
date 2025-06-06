package com.example.warehouse.restImpl;

import com.example.warehouse.dto.UserCreateRequestDto;
import com.example.warehouse.rest.AuthRest;
import com.example.warehouse.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class AuthRestImpl implements AuthRest {

    @Autowired
    private AuthService authService;

    @Override
    public ResponseEntity<String> registerNewUser(UserCreateRequestDto requestBody) {
        try{
            return authService.registerNewUser(requestBody);
        } catch (Exception e) {
            log.error("Error occurred during user registration:{}", e.getMessage(),e);
        }
        return new ResponseEntity<>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
