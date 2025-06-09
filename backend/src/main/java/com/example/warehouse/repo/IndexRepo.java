package com.example.warehouse.repo;

import com.example.warehouse.entity.Index;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IndexRepo extends JpaRepository<Index,Index> {

    Index findByIndexCode(String indexCode);
}
