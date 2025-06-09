package com.example.warehouse.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.annotations.CurrentTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "stocks")


@NamedQuery(
        name = "Stock.getAllAvailableStock",
        query = "SELECT NEW com.example.warehouse.dto.StockResponseDto(" +
                "s.id, s.product.id, s.product.name, " +
                "(SELECT SUM(st.stockIn) - SUM(st.stockOut) FROM Stock st WHERE st.batchCode = s.batchCode AND st.status = true), " +
                "s.perStockInPrice, s.supplier.id, s.supplier.contactPerson,s.batchCode, s.createdBy.username, s.createdAt) " +
                "FROM Stock s " +
                "WHERE s.status = true AND s.comesFrom = 'PURCHASE' AND " +
                "(SELECT SUM(st.stockIn) - SUM(st.stockOut) FROM Stock st WHERE st.batchCode = s.batchCode AND st.status = true) > 0"
)

@NamedQuery(
        name = "Stock.getAllAvailableStockForProduct",
        query = "SELECT NEW com.example.warehouse.dto.StockResponseDto(" +
                "s.id, s.product.id, s.product.name, " +
                "(SELECT SUM(st.stockIn) - SUM(st.stockOut) " +
                " FROM Stock st " +
                " WHERE st.batchCode = s.batchCode AND st.status = true AND st.product.id = :productId), " +
                "s.perStockInPrice, s.supplier.id, s.supplier.contactPerson,s.batchCode, s.createdBy.username, s.createdAt) " +
                "FROM Stock s " +
                "WHERE s.status = true AND s.comesFrom = 'PURCHASE' AND s.product.id = :productId AND " +
                "(SELECT SUM(st.stockIn) - SUM(st.stockOut) " +
                " FROM Stock st " +
                " WHERE st.batchCode = s.batchCode AND st.status = true AND st.product.id = :productId) > 0"
)

@NamedQuery(
        name = "Stock.getAllAvailableOnlyStockForProductByBatch",
        query = "SELECT SUM(st.stockIn) - SUM(st.stockOut) " +
                "FROM Stock st " +
                "WHERE st.batchCode = :batchCode AND st.status = true"
)

@NamedQuery(
        name = "Stock.getAllAvailableOnlyStockForProductByProductId",
        query = "SELECT SUM(st.stockIn) - SUM(st.stockOut) " +
                "FROM Stock st " +
                "WHERE st.Product.id = :productId AND st.status = true"
)



public class Stock implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer stockIn = 0;

    private Integer stockOut = 0;

    private BigDecimal perStockInPrice = BigDecimal.ZERO;

    private BigDecimal perStockOutPrice = BigDecimal.ZERO;

    private BigDecimal stockInAmount = BigDecimal.ZERO;

    private BigDecimal stockOutAmount = BigDecimal.ZERO;

    private String comesFrom;

    @NotNull
    @Column(name = "batch_code", nullable = false)
    private String batchCode;

    @Column(name = "transaction_id", nullable = false)
    private Integer transactionId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id",nullable = false)
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "supplier_id",nullable = false)
    private Supplier supplier;

    private Boolean status=true;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by")
    private User createdBy;

    @CurrentTimestamp
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(updatable = false)
    private LocalDateTime updatedAt;
}
