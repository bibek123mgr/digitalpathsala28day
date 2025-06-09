package com.example.warehouse.serviceImpl;

import com.example.warehouse.dto.SupplierCreateRequestDto;
import com.example.warehouse.entity.Supplier;
import com.example.warehouse.entity.User;
import com.example.warehouse.repo.SupplierRepo;
import com.example.warehouse.service.SupplierService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@Slf4j
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    @Override
    public ResponseEntity<String> createSupplier(SupplierCreateRequestDto requestBody) {
        try {
            Supplier supplier = mapDtoToEntity(requestBody);
            supplierRepo.save(supplier);
            return new ResponseEntity<>("Supplier created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error at createSupplier: {}", e.getMessage(), e);
            return new ResponseEntity<>("Error while creating supplier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateSupplierInfo(SupplierCreateRequestDto requestBody, Integer id) {
        try {
            Supplier existing = supplierRepo.findById(id).orElse(null);

            if (existing == null) {
                return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
            }

            updateSupplierFromDto(existing, requestBody);
            supplierRepo.save(existing);
            return new ResponseEntity<>("Supplier updated successfully", HttpStatus.OK);

        } catch (Exception e) {
            log.error("Error at updateSupplierInfo: {}", e.getMessage(), e);
            return new ResponseEntity<>("Error while updating supplier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<Supplier>> getSuppliersList() {
        try {
            List<Supplier> suppliers = supplierRepo.findAll();
            return new ResponseEntity<>(suppliers, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error at getSuppliersList: {}", e.getMessage(), e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> deleteSupplier(Integer id) {
        try {
            Supplier supplier = supplierRepo.findById(id).orElse(null);

            if (supplier == null) {
                return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
            }

            supplierRepo.delete(supplier);
            return new ResponseEntity<>("Supplier deleted successfully", HttpStatus.OK);

        } catch (Exception e) {
            log.error("Error at deleteSupplier: {}", e.getMessage(), e);
            return new ResponseEntity<>("Error while deleting supplier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Supplier mapDtoToEntity(SupplierCreateRequestDto dto) {
        Supplier supplier = new Supplier();
        supplier.setName(dto.getName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setEmail(dto.getEmail());
        supplier.setPhone(dto.getPhone());
        supplier.setAddress(dto.getAddress());
        supplier.setCategory(dto.getCategory());
        supplier.setStatus(dto.getStatus());

        User createdBy = new User();
        createdBy.setId(1);
        supplier.setCreatedBy(createdBy);

        return supplier;
    }

    private void updateSupplierFromDto(Supplier supplier, SupplierCreateRequestDto dto) {
        supplier.setName(dto.getName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setEmail(dto.getEmail());
        supplier.setPhone(dto.getPhone());
        supplier.setAddress(dto.getAddress());
        supplier.setCategory(dto.getCategory());
        supplier.setStatus(dto.getStatus());
    }
}
