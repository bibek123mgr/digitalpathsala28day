package com.example.warehouse.service;

import com.example.warehouse.dto.CreateProductRequestDto;
import com.example.warehouse.entity.Product;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ProductService {
    ResponseEntity<String> createNewProduct(CreateProductRequestDto productData);
    ResponseEntity<String> updateProductInfo(CreateProductRequestDto productData, Integer id);
    ResponseEntity<String> updateProductStatus(Integer id);
    ResponseEntity<List<Product>> getAllProduct();
}
