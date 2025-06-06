package com.example.warehouse.restImpl;

import com.example.warehouse.dto.CreateProductRequestDto;
import com.example.warehouse.entity.Product;
import com.example.warehouse.rest.ProductRest;
import com.example.warehouse.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@Slf4j
public class ProductRestImpl implements ProductRest {

    @Autowired
    private ProductService productService;

    @Override
    public ResponseEntity<String> createNewProduct(CreateProductRequestDto productDate) {
        try {
            return productService.createNewProduct(productDate);
        } catch (Exception e) {
            log.error("Error in createNewProduct: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to create product.");
        }
    }

    @Override
    public ResponseEntity<String> updateProductInfo(CreateProductRequestDto productDate,Integer id) {
        try {
            return productService.updateProductInfo(productDate,id);
        } catch (Exception e) {
            log.error("Error in updateProductInfo: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product info.");
        }
    }

    @Override
    public ResponseEntity<String> updateProductStatus(Integer id) {
        try {
            return productService.updateProductStatus(id);
        } catch (Exception e) {
            log.error("Error in updateProductStatus: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update product status.");
        }
    }

    @Override
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            return productService.getAllProduct();
        } catch (Exception e) {
            log.error("Error in getAllProduct: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
