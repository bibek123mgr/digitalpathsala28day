package com.example.warehouse.restImpl;

import com.example.warehouse.dto.ComboBoxResponseDto;
import com.example.warehouse.dto.SupplierCreateRequestDto;
import com.example.warehouse.dto.SupplierResponseDto;
import com.example.warehouse.entity.Supplier;
import com.example.warehouse.rest.SupplierRest;
import com.example.warehouse.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@RestController
public class SupplierRestImpl implements SupplierRest {

    @Autowired
    private SupplierService supplierService;

    @Override
    public ResponseEntity<String> createSupplier(SupplierCreateRequestDto requestBody) {
        try {
            return supplierService.createSupplier(requestBody);
        } catch (Exception e) {
            log.error("Error occurred at createSupplier: {}", e.getMessage(), e);
        }
        return new ResponseEntity<>("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> updateSupplierInfo(SupplierCreateRequestDto requestBody, Integer id) {
        try {
            return supplierService.updateSupplierInfo(requestBody, id);
        } catch (Exception e) {
            log.error("Error occurred at updateSupplierInfo: {}", e.getMessage(), e);
        }
        return new ResponseEntity<>("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<SupplierResponseDto>> getSuppliersList() {
        try {
            return supplierService.getSuppliersList();
        } catch (Exception e) {
            log.error("Error occurred at getSuppliersList: {}", e.getMessage(), e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<String> deleteSupplier(Integer id) {
        try {
            return supplierService.deleteSupplier(id);
        } catch (Exception e) {
            log.error("Error occurred at deleteSupplier: {}", e.getMessage(), e);
        }
        return new ResponseEntity<>("INTERNAL SERVER ERROR", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Override
    public ResponseEntity<List<ComboBoxResponseDto>> getAllActiveSupplierForComboBox() {
        try {
            return supplierService.getAllActiveSupplierForComboBox();
        } catch (Exception e) {
            log.error("Error occurred at getSuppliersList: {}", e.getMessage(), e);
        }
        return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}