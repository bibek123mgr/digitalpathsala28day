package com.example.warehouse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChangePasswordDto {

    @NotBlank(message = "Old Password is required")
    private String oldPassword;

    @NotBlank(message = "new Password is required")
    private String newPassword;
}
