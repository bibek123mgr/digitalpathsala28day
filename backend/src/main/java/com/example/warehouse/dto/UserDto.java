package com.example.warehouse.dto;

import com.example.warehouse.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CurrentTimestamp;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
public class UserDto {

    private Integer id;
    private String userName;
    private String email;
    private String role;
    private Boolean status;
    private String createdBy;
    private LocalDateTime createdAt;

    public UserDto(Integer id, String userName, String email, String role, Boolean status, String createdBy, LocalDateTime createdAt) {
        this.id = id;
        this.userName = userName;
        this.email = email;
        this.role = role;
        this.status = status;
        this.createdBy = createdBy;
        this.createdAt = createdAt;
    }
}
