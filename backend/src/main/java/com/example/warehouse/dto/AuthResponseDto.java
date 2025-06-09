package com.example.warehouse.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class AuthResponseDto {

    private String message;
    private String token;

    public AuthResponseDto(@JsonProperty("message") String message, @JsonProperty("token") String token) {
        this.message = message;
        this.token = token;
    }
}
