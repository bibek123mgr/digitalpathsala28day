package com.example.warehouse.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class ResponseDto<T> {

    private String message;
    private T data;

}
