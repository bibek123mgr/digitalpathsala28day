package com.example.warehouse.repo;

import com.example.warehouse.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SupplierRepo extends JpaRepository<Supplier,Integer> {
}
