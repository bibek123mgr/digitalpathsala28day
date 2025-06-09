package com.example.warehouse.serviceImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.AuthResponseDto;
import com.example.warehouse.dto.ChangePasswordDto;
import com.example.warehouse.dto.UserCreateRequestDto;
import com.example.warehouse.dto.UserLoginRequestDto;
import com.example.warehouse.entity.User;
import com.example.warehouse.entity.UserPrincipal;
import com.example.warehouse.jwt.JWTService;
import com.example.warehouse.repo.UserRepo;
import com.example.warehouse.service.AuthService;
import com.example.warehouse.utils.WASUtils;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private BCryptPasswordEncoder encoder;

    @Override
    public ResponseEntity<String> registerNewUser(UserCreateRequestDto requestBody) {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal= (UserPrincipal) authentication.getPrincipal();
            Integer userId= userPrincipal.getId();
            userRepo.save(mapRequestDataInUser(requestBody, userId));
            return new ResponseEntity<>("User Register Successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error occurred at AuthServiceImpl:{}",e.getMessage(),e);
        }
        return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> changePassword(ChangePasswordDto requestBody) {
    try{
        Authentication authentication=SecurityContextHolder.getContext().getAuthentication();
        UserPrincipal userPrincipal=(UserPrincipal) authentication.getPrincipal();
        Integer userId= userPrincipal.getId();
        User user = userRepo.findById(userId).orElse(null);
        if (user == null) {
            return new ResponseEntity<>("User not found", HttpStatus.NOT_FOUND);
        } else {
            if (encoder.matches(requestBody.getOldPassword(), user.getPassword())){
                user.setPassword(encoder.encode(requestBody.getNewPassword()));
                userRepo.save(user);
                return WASUtils.getResponse("Password changed successfully", HttpStatus.INTERNAL_SERVER_ERROR);

            } else {
                return WASUtils.getResponse("Old password is incorrect", HttpStatus.INTERNAL_SERVER_ERROR);

            }
        }
    }catch (Exception e) {
        log.error("Error occurred in login: {}", e.getMessage(), e);
    }
        return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> login(UserLoginRequestDto requestBody) {
        try {
            String email = requestBody.getEmail();
            String password = requestBody.getPassword();

            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            if(authentication.isAuthenticated()) {
                UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
                String username = userPrincipal.getUsername();
                String role = userPrincipal.getAuthorities().iterator().next().getAuthority();
                String token = jwtService.generateToken(username, role);
                return new ResponseEntity<>("{\"message\":\"Login successfully\",\"token\":\"" + token + "\"}", HttpStatus.OK);
            }else{
                return WASUtils.getResponse("Invalid email or password", HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            log.error("Error occurred in login: {}", e.getMessage(), e);
        }
        return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    private User mapRequestDataInUser(UserCreateRequestDto requestBody,Integer userId) {
        User user = new User();
        user.setEmail(requestBody.getEmail());
        user.setRole(requestBody.getRole());
        user.setPassword(encoder.encode(requestBody.getPassword()));
        user.setUserName(requestBody.getUserName());
        user.setStatus(true);
        User createdByUser = new User();
        createdByUser.setId(userId);
        user.setCreatedBy(createdByUser);
        return user;
    }

}
