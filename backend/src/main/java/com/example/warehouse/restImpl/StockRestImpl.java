package com.example.warehouse.restImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.AddStockRequestDto;
import com.example.warehouse.dto.StockResponseDto;
import com.example.warehouse.rest.StockRest;
import com.example.warehouse.service.StockService;
import com.example.warehouse.utils.WASUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class StockRestImpl implements StockRest {

    @Autowired
    private StockService stockService;

    @Override
    public ResponseEntity<String> addStock(AddStockRequestDto addStockRequestDto) {
        try {
            return stockService.addStock(addStockRequestDto);
        } catch (Exception e) {
            log.error("Error occurred at addStock: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateStock(AddStockRequestDto addStockRequestDto, Integer id) {
        try {
            return stockService.updateStock(addStockRequestDto, id);
        } catch (Exception e) {
            log.error("Error occurred at updateStock for ID {}: {}", id, e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateStockStatus(Integer id) {
        try {
            return stockService.updateStockStatus(id);
        } catch (Exception e) {
            log.error("Error occurred at updateStockStatus for ID {}: {}", id, e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<StockResponseDto>> getAllAvailableProductStock() {
        try {
            return stockService.getAllAvailableProductStock();
        } catch (Exception e) {
            log.error("Error occurred at getAllAvailableProductStock for ID {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<StockResponseDto>> getAllAvailableOfStockParticularProduct(Integer id) {
        try {
            return stockService.getAllAvailableOfStockParticularProduct(id);
        } catch (Exception e) {
            log.error("Error occurred at getAllAvailableProductStock for ID {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
