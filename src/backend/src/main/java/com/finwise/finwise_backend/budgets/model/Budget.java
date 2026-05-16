package com.finwise.finwise_backend.budgets.model;

import com.finwise.finwise_backend.categories.model.Category;
import com.finwise.finwise_backend.users.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    private Long id;
    private BigDecimal limitAmount;
    private BigDecimal spentAmount;
    private Integer month;
    private Integer year;
    private Category category;
    private User user;
}
