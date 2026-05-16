package com.finwise.finwise_backend.budgets.dto;

import com.finwise.finwise_backend.categories.dto.CategoryDTO;
import com.finwise.finwise_backend.users.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetDTO {
    private Long id;
    private BigDecimal limitAmount;
    private BigDecimal spentAmount;
    private Integer month;
    private Integer year;
    private CategoryDTO category;
    private UserDTO user;
}
