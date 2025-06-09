package com.example.warehouse.rest;

import com.example.warehouse.dto.AddOrderRequestDto;
import com.example.warehouse.dto.OrderResponseDto;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/orders")
public interface OrderRest {

    @PostMapping()
    public ResponseEntity<String> createNewOrder(@Valid AddOrderRequestDto order);

    @PutMapping("/{id}")
    public ResponseEntity<String> updateOrder(@Valid AddOrderRequestDto order,@PathVariable Integer id);

    @GetMapping()
    public ResponseEntity<List<OrderResponseDto>> getAllOrders();

    @GetMapping("/{id}")
    public ResponseEntity<OrderResponseDto> getParticularOrders(@PathVariable Integer id);

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateOrderStatus(@PathVariable Integer id);
}
