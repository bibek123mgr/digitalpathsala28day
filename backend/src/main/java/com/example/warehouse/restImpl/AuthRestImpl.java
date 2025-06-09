package com.example.warehouse.restImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.AuthResponseDto;
import com.example.warehouse.dto.ChangePasswordDto;
import com.example.warehouse.dto.UserCreateRequestDto;
import com.example.warehouse.dto.UserLoginRequestDto;
import com.example.warehouse.rest.AuthRest;
import com.example.warehouse.service.AuthService;
import com.example.warehouse.utils.WASUtils;
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
        return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> login(UserLoginRequestDto requestBody) {
        try{
            return authService.login(requestBody);
        } catch (Exception e) {
            log.error("Error occurred during user registration:{}", e.getMessage(),e);
        }
        return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(ChangePasswordDto requestBody) {
        try{
            return authService.changePassword(requestBody);
        } catch (Exception e) {
            log.error("Error occurred during user registration:{}", e.getMessage(),e);
        }
        return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
