package com.example.warehouse.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class StockResponseDto {
    private Integer id;
    private Integer productId;
    private String productName;
    private Long stock;
    private BigDecimal perStockPrice;
    private BigDecimal totalStockPrice;
    private Integer supplierId;
    private String supplier;
    private String batchCode;
    private String createdBy;
    private LocalDateTime createdAt;

    public StockResponseDto(Integer id, Integer productId, String productName, Long stock, BigDecimal perStockPrice, Integer supplierId, String supplier, String batchCode, String createdBy, LocalDateTime createdAt) {
        this.id = id;
        this.productId = productId;
        this.productName = productName;
        this.stock = stock;
        this.perStockPrice = perStockPrice;
        this.supplierId = supplierId;
        this.supplier = supplier;
        this.batchCode = batchCode;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
        this.totalStockPrice = perStockPrice.multiply(BigDecimal.valueOf(stock));
    }
}
