package com.example.warehouse.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateProductRequestDto {

    @NotBlank(message = "Product Name is required")
    private String name;

    @NotBlank(message = "Product Description is required")
    private String description;

}
