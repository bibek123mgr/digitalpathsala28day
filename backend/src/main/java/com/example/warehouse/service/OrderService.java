package com.example.warehouse.service;

import com.example.warehouse.dto.AddOrderRequestDto;
import com.example.warehouse.dto.OrderResponseDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface OrderService {
    ResponseEntity<String> createNewOrder(AddOrderRequestDto order);
    ResponseEntity<String> updateOrder(AddOrderRequestDto order,Integer id);
    ResponseEntity<List<OrderResponseDto>> getAllOrders();
    ResponseEntity<OrderResponseDto> getParticularOrders(Integer id);
    ResponseEntity<String> updateOrderStatus(Integer id);

}
