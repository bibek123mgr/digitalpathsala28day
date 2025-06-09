package com.example.warehouse.service;

import com.example.warehouse.dto.SupplierCreateRequestDto;
import com.example.warehouse.entity.Supplier;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SupplierService {
    ResponseEntity<String> createSupplier(SupplierCreateRequestDto requestBody);
    ResponseEntity<String> updateSupplierInfo(SupplierCreateRequestDto requestBody, Integer id);
    ResponseEntity<List<Supplier>> getSuppliersList();
    ResponseEntity<String> deleteSupplier(Integer id);
}
