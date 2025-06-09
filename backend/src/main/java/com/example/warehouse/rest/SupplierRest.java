package com.example.warehouse.rest;

import com.example.warehouse.dto.SupplierCreateRequestDto;
import com.example.warehouse.entity.Supplier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/suppliers")
public interface SupplierRest {

    @PostMapping()
    public ResponseEntity<String> createSupplier(@RequestBody SupplierCreateRequestDto requestBody);

    @PutMapping("/{id}")
    public ResponseEntity<String> updateSupplierInfo(@RequestBody SupplierCreateRequestDto requestBody,@PathVariable Integer id);

    @GetMapping()
    public ResponseEntity<List<Supplier>> getSuppliersList();

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSupplier(@PathVariable Integer id);


}
