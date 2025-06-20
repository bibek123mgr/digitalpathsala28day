package com.example.warehouse.dto;

import com.example.warehouse.entity.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class SupplierResponseDto {

    private Integer id;

    private String name;

    private String contactPerson;

    private String email;

    private String phone;

    private String address;

    private String category;

    private String createdBy;

    private LocalDateTime createdAt;

}
