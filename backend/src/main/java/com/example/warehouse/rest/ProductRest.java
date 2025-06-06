package com.example.warehouse.rest;

import com.example.warehouse.dto.CreateProductRequestDto;
import com.example.warehouse.entity.Product;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api/v1/products")
public interface ProductRest {

    @PostMapping()
    public ResponseEntity<String> createNewProduct(@RequestBody CreateProductRequestDto productDate);

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProductInfo(@RequestBody CreateProductRequestDto productDate,@PathVariable Integer id);

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateProductStatus(@PathVariable Integer id);

    @PostMapping()
    public ResponseEntity<List<Product>> getAllProduct();
}
