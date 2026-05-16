package com.finwise.finwise_backend.transactions.model;

import com.finwise.finwise_backend.categories.model.Category;
import com.finwise.finwise_backend.users.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Transaction {
    private Long id;
    private BigDecimal amount;
    private LocalDate date;
    private String description;
    private Category category;
    private User user;
}
