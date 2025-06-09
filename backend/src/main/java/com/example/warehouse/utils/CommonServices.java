package com.example.warehouse.utils;

import com.example.warehouse.entity.Index;
import com.example.warehouse.repo.IndexRepo;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@Service
public class CommonServices {

    @Autowired
    private IndexRepo indexRepo;

    public  Integer getTransactionId() {
        try {
            Index index = getIndexDetail("TRN");
            if (index != null && index.getMaxId() != null) {
                return index.getMaxId() + 1;
            } else {
                log.warn("Index with code 'TRN' not found or maxId is null.");
                return null;
            }
        } catch (Exception e) {
            log.error("Error occurred at getTransactionId: {}", e.getMessage(), e);
            return null;
        }
    }

    public void updateTransactionId(Integer maxId) {
        try {
            Index index = getIndexDetail("TRN");
            if (index != null) {
                index.setMaxId(maxId);
                indexRepo.save(index);
            } else {
                log.warn("Index with code 'TRN' not found while trying to update maxId.");
            }
        } catch (Exception e) {
            log.error("Error occurred at updateTransactionId: {}", e.getMessage(), e);
        }
    }

    private Index getIndexDetail(String indexCode) {
        return indexRepo.findByIndexCode(indexCode);
    }

    public String generateBatchCode() {
        LocalDateTime now = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyyMMddss");
        return now.format(formatter);
    }
}
