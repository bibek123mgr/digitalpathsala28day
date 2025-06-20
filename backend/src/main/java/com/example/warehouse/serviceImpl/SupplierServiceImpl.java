package com.example.warehouse.serviceImpl;

import com.example.warehouse.constants.WASConstants;
import com.example.warehouse.dto.ComboBoxResponseDto;
import com.example.warehouse.dto.SupplierCreateRequestDto;
import com.example.warehouse.dto.SupplierResponseDto;
import com.example.warehouse.entity.Supplier;
import com.example.warehouse.entity.User;
import com.example.warehouse.entity.UserPrincipal;
import com.example.warehouse.repo.SupplierRepo;
import com.example.warehouse.service.SupplierService;
import com.example.warehouse.utils.WASUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@Slf4j
public class SupplierServiceImpl implements SupplierService {

    @Autowired
    private SupplierRepo supplierRepo;

    @Override
    public ResponseEntity<String> createSupplier(SupplierCreateRequestDto requestBody) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || !(authentication.getPrincipal() instanceof UserPrincipal)) {
                return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
            }

            UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
            Integer userId = userPrincipal.getId();

            Supplier supplier = mapDtoToEntity(requestBody,userId);
            supplierRepo.save(supplier);
            return WASUtils.getResponse("Supplier created successfully",HttpStatus.CREATED);
        } catch (Exception e) {
            log.error("Error at createSupplier: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<String> updateSupplierInfo(SupplierCreateRequestDto requestBody, Integer id) {
        try {
            Supplier existing = supplierRepo.findById(id).orElse(null);

            if (existing == null) {
                return WASUtils.getResponse("Supplier not found",HttpStatus.NOT_FOUND);
            }

            updateSupplierFromDto(existing, requestBody);
            supplierRepo.save(existing);
            return WASUtils.getResponse("Supplier updated successfully",HttpStatus.OK);

        } catch (Exception e) {
            log.error("Error at updateSupplierInfo: {}", e.getMessage(), e);
            return WASUtils.getResponse(WASConstants.INTERNAL_SERVER_ERROR,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<SupplierResponseDto>> getSuppliersList() {
        try {
            List<Supplier> suppliers = supplierRepo.findByStatusTrue();
            List<SupplierResponseDto> supplierResponseDtos=suppliers.stream()
                    .map(this::mapSupplierToEntity)
                    .collect(Collectors.toList());
            return new ResponseEntity<>(supplierResponseDtos, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error at getSuppliersList: {}", e.getMessage(), e);
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private SupplierResponseDto mapSupplierToEntity(Supplier supplier){
        SupplierResponseDto supplierResponseDto=new SupplierResponseDto();
        supplierResponseDto.setId(supplier.getId());
        supplierResponseDto.setName(supplier.getName());
        supplierResponseDto.setContactPerson(supplier.getContactPerson());
        supplierResponseDto.setEmail(supplier.getEmail());
        supplierResponseDto.setPhone(supplier.getPhone());
        supplierResponseDto.setAddress(supplier.getAddress());
        supplierResponseDto.setCategory(supplier.getCategory());
        supplierResponseDto.setCreatedBy(supplier.getCreatedBy().getUserName());
        supplierResponseDto.setCreatedAt(supplier.getCreatedAt());
        return supplierResponseDto;
    }

    @Override
    public ResponseEntity<String> deleteSupplier(Integer id) {
        try {
            Supplier supplier = supplierRepo.findById(id).orElse(null);

            if (supplier == null) {
                return new ResponseEntity<>("Supplier not found", HttpStatus.NOT_FOUND);
            }
            supplier.setStatus(false);
            supplierRepo.save(supplier);
            return new ResponseEntity<>("Supplier deleted successfully", HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error at deleteSupplier: {}", e.getMessage(), e);
            return new ResponseEntity<>("Error while deleting supplier", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Override
    public ResponseEntity<List<ComboBoxResponseDto>> getAllActiveSupplierForComboBox() {
        try {
            List<Supplier> suppliers = supplierRepo.findByStatusTrue();
            List<ComboBoxResponseDto> supplierResponseDtos=suppliers.stream()
                    .map(supplier -> new ComboBoxResponseDto(
                            supplier.getId(),
                            '['+supplier.getName()+']' + '['+supplier.getAddress()+']'
                    ))
                    .collect(Collectors.toList());
            return new ResponseEntity<>(supplierResponseDtos, HttpStatus.OK);
        } catch (Exception e) {
            log.error("Error at getSuppliersList: {}", e.getMessage(), e);
            return new ResponseEntity<>(new ArrayList<>(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private Supplier mapDtoToEntity(SupplierCreateRequestDto dto,Integer userId) {
        User user=new User();
        user.setId(userId);

        Supplier supplier = new Supplier();
        supplier.setName(dto.getName());
        supplier.setContactPerson(dto.getContactPerson());
        supplier.setEmail(dto.getEmail());
        supplier.setPhone(dto.getPhone());
        supplier.setAddress(dto.getAddress());
        supplier.setCategory(dto.getCategory());
        supplier.setStatus(dto.getStatus());
        supplier.setCreatedBy(user);

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
