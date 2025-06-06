package com.example.warehouse.repo;

import com.example.warehouse.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepo extends JpaRepository<Stock,Integer> {
}
