package com.example.warehouse.serviceImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.ComboBoxResponseDto;
import com.example.warehouse.dto.CreateProductRequestDto;
import com.example.warehouse.entity.Product;
import com.example.warehouse.entity.User;
import com.example.warehouse.entity.UserPrincipal;
import com.example.warehouse.repo.ProductRepo;
import com.example.warehouse.service.ProductService;
import com.example.warehouse.utils.WASUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo repo;

    @Override
    public ResponseEntity<String> createNewProduct(CreateProductRequestDto productData) {
        try {
            Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
            UserPrincipal userPrincipal= (UserPrincipal) authentication.getPrincipal();
            Integer userId= userPrincipal.getId();
            Product product = mapCreateProductDtoToEntity(productData,userId);
            repo.save(product);
            return WASUtils.getResponse("Product created successfully.", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error in createNewProduct: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateProductInfo(CreateProductRequestDto productData, Integer id) {
        try {
            Product product = repo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
            updateProductFromDto(product, productData);
            repo.save(product);
            return WASUtils.getResponse("Product updated successfully.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in updateProductInfo: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateProductStatus(Integer id) {
        try {
            Product product = repo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));
            product.setStatus(!product.getStatus());
            repo.save(product);
            return WASUtils.getResponse("Product deleted successfully.", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error in updateProductStatus: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Product>> getAllProduct() {
        try {
            List<Product> products = repo.findByStatusTrue();
            return ResponseEntity.ok(products);
        } catch (Exception e) {
            log.error("Error in getAllProduct: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<ComboBoxResponseDto>> getAllActiveProductForComboBox() {
        try {
            List<Product> products = repo.findByStatusTrue();
            List<ComboBoxResponseDto> responseDtos=products.stream().map(product ->
                    new ComboBoxResponseDto(
                            product.getId(),
                            product.getName()
                    ))
                    .collect(Collectors.toList());
            return ResponseEntity.ok(responseDtos);
        } catch (Exception e) {
            log.error("Error in getAllProduct: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Product mapCreateProductDtoToEntity(CreateProductRequestDto dto,Integer userId) {
        Product product = new Product();
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
        product.setStatus(true);
        User user = new User();
        user.setId(userId);
        product.setCreatedBy(user);
        return product;
    }

    private void updateProductFromDto(Product product, CreateProductRequestDto dto) {
        product.setName(dto.getName());
        product.setDescription(dto.getDescription());
    }
}
