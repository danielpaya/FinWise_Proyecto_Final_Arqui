package com.finwise.finwise_backend.categories.dto;

import com.finwise.finwise_backend.shared.enums.CategoryType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDTO {
    private Long id;
    private String name;
    private CategoryType type;
    private String color;
}
