package com.example.warehouse.serviceImpl;

import com.example.warehouse.dto.UserCreateRequestDto;
import com.example.warehouse.entity.User;
import com.example.warehouse.repo.UserRepo;
import com.example.warehouse.service.AuthService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@Transactional
public class AuthServiceImpl implements AuthService {

    @Autowired
    private UserRepo userRepo;

    @Override
    public ResponseEntity<String> registerNewUser(UserCreateRequestDto requestBody) {
        try{
            userRepo.save(mapRequestDataInUser(requestBody));
            return new ResponseEntity<>("User Register Successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error occurred at AuthServiceImpl:{}",e.getMessage(),e);
        }
        return new ResponseEntity<>("INTERNAL_SERVER_ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    private User mapRequestDataInUser(UserCreateRequestDto requestBody) {
        User user = new User();
        user.setRole(requestBody.getRole());
        user.setPassword(requestBody.getPassword());
        user.setUserName(requestBody.getUserName());
        user.setStatus(true);
        User createdByUser = new User();
        createdByUser.setId(1);
        user.setCreatedBy(createdByUser);

        return user;
    }

}
