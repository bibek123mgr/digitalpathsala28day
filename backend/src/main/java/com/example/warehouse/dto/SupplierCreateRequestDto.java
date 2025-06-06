package com.example.warehouse.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SupplierCreateRequestDto {

    @NotBlank(message = "Supplier name is required")
    private String name;

    @NotBlank(message = "Contact Person name is required")
    private String contactPerson;

    @NotBlank(message = "Phone name is required")
    private String phone;

    @Email
    @NotBlank(message = "Email name is required")
    private String email;

    @NotBlank(message = "Address name is required")
    private String address;

    @NotBlank(message = "Supplier Category name is required")
    private String category;

    private Boolean status=true;
}
