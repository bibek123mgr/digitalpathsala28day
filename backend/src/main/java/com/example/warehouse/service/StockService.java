package com.example.warehouse.service;

import com.example.warehouse.dto.AddStockRequestDto;
import com.example.warehouse.dto.StockResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface StockService {
    ResponseEntity<String> addStock(AddStockRequestDto addStockRequestDto);

    ResponseEntity<String> updateStock(AddStockRequestDto addStockRequestDto, Integer id);

    ResponseEntity<String> updateStockStatus(Integer id);

    ResponseEntity<List<StockResponseDto>> getAllAvailableProductStock();

    ResponseEntity<List<StockResponseDto>> getAllAvailableOfStockParticularProduct(Integer id);
}
