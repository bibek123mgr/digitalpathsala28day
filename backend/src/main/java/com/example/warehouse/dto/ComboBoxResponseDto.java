package com.example.warehouse.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ComboBoxResponseDto {

    private Integer id;
    private String name;

    public ComboBoxResponseDto(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

}
