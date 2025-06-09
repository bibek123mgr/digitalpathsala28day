package com.example.warehouse.restImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.AddOrderRequestDto;
import com.example.warehouse.dto.OrderResponseDto;
import com.example.warehouse.rest.OrderRest;
import com.example.warehouse.service.OrderService;
import com.example.warehouse.utils.WASUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class OrderRestImpl implements OrderRest {

    @Autowired
    private OrderService orderService;

    @Override
    public ResponseEntity<String> createNewOrder(AddOrderRequestDto order) {
        try {
            return orderService.createNewOrder(order);
        } catch (Exception e) {
            log.error("Error occurred at createNewOrder: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateOrder(AddOrderRequestDto order,Integer id) {
        try {
            return orderService.updateOrder(order,id);
        } catch (Exception e) {
            log.error("Error occurred at updateOrder: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<OrderResponseDto>> getAllOrders() {
        try {
            return orderService.getAllOrders();
        } catch (Exception e) {
            log.error("Error occurred at getAllOrders: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<OrderResponseDto> getParticularOrders(Integer id) {
        try {
            return orderService.getParticularOrders(id);
        } catch (Exception e) {
            log.error("Error occurred at getParticularOrders: {}", e.getMessage(), e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateOrderStatus(Integer id) {
        try {
            return orderService.updateOrderStatus(id);
        } catch (Exception e) {
            log.error("Error occurred at updateOrderStatus: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
