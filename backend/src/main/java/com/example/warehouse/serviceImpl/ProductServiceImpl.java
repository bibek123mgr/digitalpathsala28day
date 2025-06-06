package com.example.warehouse.serviceImpl;

import com.example.warehouse.dto.CreateProductRequestDto;
import com.example.warehouse.entity.Product;
import com.example.warehouse.entity.User;
import com.example.warehouse.repo.ProductRepo;
import com.example.warehouse.service.ProductService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo repo;

    @Override
    public ResponseEntity<String> createNewProduct(CreateProductRequestDto productData) {
        try {
            Product product = mapCreateProductDtoToEntity(productData);
            repo.save(product);
            return new ResponseEntity<>("Product created successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error in createNewProduct: {}", e.getMessage(), e);
            return new ResponseEntity<>("INTERNAL SERVER ERROR.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateProductInfo(CreateProductRequestDto productData, Integer id) {
        try {
            Product product = repo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
            updateProductFromDto(product, productData);
            repo.save(product);
            return new ResponseEntity<>("Product updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in updateProductInfo: {}", e.getMessage(), e);
            return new ResponseEntity<>("INTERNAL SERVER ERROR.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateProductStatus(Integer id) {
        try {
            Product product = repo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

            product.setStatus(!product.getStatus());
            repo.save(product);

            return new ResponseEntity<>("Product status updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in updateProductStatus: {}", e.getMessage(), e);
            return new ResponseEntity<>("INTERNAL SERVER ERROR.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            List<Product> products = repo.findAll();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error in getAllProduct: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Product mapCreateProductDtoToEntity(CreateProductRequestDto dto) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setStatus(true);

        User user = new User();
        user.setId(1);
        product.setCreatedBy(user);

        return product;
    }

    private void updateProductFromDto(Product product, CreateProductRequestDto dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
    }
}
