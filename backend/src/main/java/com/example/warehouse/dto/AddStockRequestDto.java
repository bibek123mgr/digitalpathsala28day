package com.example.warehouse.dto;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class AddStockRequestDto {

    @NotNull(message = "stock is required")
    private Integer stockIn;

    @NotNull(message = "Product per Unit Price is required")
    private BigDecimal perStockInPrice;

    @NotNull(message = "Total Amount is required")
    private BigDecimal stockInAmount;

    @NotNull(message = "product is required")
    private Integer productId;

    @NotNull(message = "supplier is required")
    private Integer supplierId;
}
