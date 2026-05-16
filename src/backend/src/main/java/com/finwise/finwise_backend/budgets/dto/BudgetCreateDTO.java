package com.finwise.finwise_backend.budgets.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BudgetCreateDTO {
    private BigDecimal limitAmount;
    private Integer month;
    private Integer year;
    private Long categoryId;
}
