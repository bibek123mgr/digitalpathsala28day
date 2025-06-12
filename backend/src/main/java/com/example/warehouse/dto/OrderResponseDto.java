package com.example.warehouse.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@NoArgsConstructor
@Data
public class OrderResponseDto {

    private Integer id;

    private String name;

    private String address;

    private String contactNumber;

    private List<OrderResponseDto.Product> order;

    @Data
    public static class Product {

        private Integer id;

        private Integer productId;

        private String productName;

        private String imageUrl;

        private Integer orderQty;

        private BigDecimal perOrderQty;

        private BigDecimal totalAmount;

        private String batchCode;
    }

    private BigDecimal totalAmount;

    private String createdBy;

    private LocalDateTime createdAt;

}
