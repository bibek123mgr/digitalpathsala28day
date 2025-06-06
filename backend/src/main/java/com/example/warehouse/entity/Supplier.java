package com.example.warehouse.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "suppliers")
public class Supplier {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String name;

    private String contactPerson;

    private String email;

    private String phone;

    private String address;

    private String category;

    private Boolean status=false;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CurrentTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(updatable = false)
    private LocalDateTime updatedAt;

}
