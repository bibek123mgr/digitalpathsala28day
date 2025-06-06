package com.example.warehouse.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "stocks")
public class Stock {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer stockIn;

    private Integer stockOut;

    private BigDecimal perStockInPrice;

    private BigDecimal perStockOutPrice;
    
    private BigDecimal stockInAmount;

    private BigDecimal stockOutAmount;

    private String comesFrom;

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
