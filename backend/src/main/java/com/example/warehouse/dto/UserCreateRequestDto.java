package com.example.warehouse.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UserCreateRequestDto {

    @NotBlank(message = "username is required")
    private String userName;

    @Email
    @NotBlank(message = "email is required")
    private String email;

    @NotBlank(message = "role is required")
    private String role;

    @NotBlank(message = "password is required")
    private String password;


}
