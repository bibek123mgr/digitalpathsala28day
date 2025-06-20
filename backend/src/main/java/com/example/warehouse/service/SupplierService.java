package com.example.warehouse.service;

import com.example.warehouse.dto.ComboBoxResponseDto;
import com.example.warehouse.dto.SupplierCreateRequestDto;
import com.example.warehouse.dto.SupplierResponseDto;
import com.example.warehouse.entity.Supplier;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface SupplierService {
    ResponseEntity<String> createSupplier(SupplierCreateRequestDto requestBody);
    ResponseEntity<String> updateSupplierInfo(SupplierCreateRequestDto requestBody, Integer id);
    ResponseEntity<List<SupplierResponseDto>> getSuppliersList();
    ResponseEntity<String> deleteSupplier(Integer id);

    ResponseEntity<List<ComboBoxResponseDto>> getAllActiveSupplierForComboBox();
}
