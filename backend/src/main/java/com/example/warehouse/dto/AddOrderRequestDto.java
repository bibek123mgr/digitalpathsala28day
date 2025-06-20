package com.example.warehouse.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class AddOrderRequestDto {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "\\d{10}", message = "Contact number must be 10 digits")
    private String contactNumber;

    @NotEmpty(message = "Order list cannot be empty")
    @Size(min = 1, message = "Order must contain at least 1 item")
    private List<@Valid Product> order;

    @Data
    public static class Product {

        private Integer id;

        @NotNull(message = "Product ID is required")
        private Integer productId;

        @NotNull(message = "Order quantity is required")
        @Min(value = 1, message = "Order quantity must be at least 1")
        private Integer orderQty;

        @NotNull(message = "Per order quantity is required")
        @DecimalMin(value = "0.01", message = "Per order quantity must be greater than 0")
        private BigDecimal perOrderQty;

        @NotNull(message = "Supplier ID is required")
        private Integer supplierId;

        @NotBlank(message = "Batch code is required")
        private String batchCode;

        private Boolean status=true;
    }
}
