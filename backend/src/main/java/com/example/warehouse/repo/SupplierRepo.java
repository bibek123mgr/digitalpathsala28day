package com.example.warehouse.repo;

import com.example.warehouse.entity.Supplier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SupplierRepo extends JpaRepository<Supplier,Integer> {
    List<Supplier> findByStatusTrue();
}
