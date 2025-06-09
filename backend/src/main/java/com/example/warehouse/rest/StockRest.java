package com.example.warehouse.rest;


import com.example.warehouse.dto.AddStockRequestDto;
import com.example.warehouse.dto.StockResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/stocks")
public interface StockRest {

    @PostMapping()
    public ResponseEntity<String> addStock(@Valid @RequestBody AddStockRequestDto addStockRequestDto);

    @PutMapping("/{id}")
    public ResponseEntity<String> updateStock(@Valid @RequestBody AddStockRequestDto addStockRequestDto, @PathVariable Integer id);

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateStockStatus(@PathVariable Integer id);

    @GetMapping()
    public ResponseEntity<List<StockResponseDto>> getAllAvailableProductStock();

    @GetMapping("/product/{id}")
    public ResponseEntity<List<StockResponseDto>> getAllAvailableOfStockParticularProduct(@PathVariable Integer id);


}
