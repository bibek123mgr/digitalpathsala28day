package com.example.warehouse.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String userName;

    private String email;

    private String role;

    private String password;

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
