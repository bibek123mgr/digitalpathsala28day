package com.example.warehouse.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class StockOverviewDto {


    private Integer productId;
    private String productName;
    private Long availableStock;
    private Long totalStockIn;
    private Long totalStockOut;

    public StockOverviewDto(Integer productId, String productName,
                            Long availableStock, Long totalStockIn, Long totalStockOut) {
        this.productId = productId;
        this.productName = productName;
        this.availableStock = availableStock;
        this.totalStockIn = totalStockIn;
        this.totalStockOut = totalStockOut;
    }
}
