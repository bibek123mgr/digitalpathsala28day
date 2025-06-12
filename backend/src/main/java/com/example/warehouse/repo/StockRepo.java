package com.example.warehouse.repo;

import com.example.warehouse.dto.StockResponseDto;
import com.example.warehouse.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StockRepo extends JpaRepository<Stock,Integer> {

    @Query(name = "Stock.getAllAvailableStock")
    List<StockResponseDto> getAllAvailableStock();

    @Query(name = "Stock.getAllAvailableStockForProduct")
    List<StockResponseDto> getAllAvailableStockForProduct(@Param("productId") Integer productId);

    @Query(name = "Stock.getAllAvailableOnlyStockForProductByBatch")
    Integer getAllAvailableOnlyStockForProductByBatch(@Param("batchCode") String batchCode);

    @Query(name = "Stock.getAllAvailableOnlyStockForProductByProductId")
    Integer getAllAvailableOnlyStockForProductByProductId(@Param("productId") Integer productId);

    List<Stock> findAllByTransactionIdAndStatusTrue(Integer transactionId);

    @Query(name = "Stock.updateStockStatusByTransactionId")
    void updateStockStatusByTransactionId(@Param("transactionId") Integer transactionId);

}
