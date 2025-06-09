package com.example.warehouse.rest;

import com.example.warehouse.dto.CreateProductRequestDto;
import com.example.warehouse.entity.Product;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequestMapping("/api/v1/products")
public interface ProductRest {

    @PostMapping()
    public ResponseEntity<String> createNewProduct(@Valid @RequestBody CreateProductRequestDto productDate);

    @GetMapping()
    public ResponseEntity<List<Product>> getAllProduct();

    @PutMapping("/{id}")
    public ResponseEntity<String> updateProductInfo(@Valid @RequestBody CreateProductRequestDto productDate,@PathVariable Integer id);

    @PatchMapping("/{id}")
    public ResponseEntity<String> updateProductStatus(@PathVariable Integer id);


}
