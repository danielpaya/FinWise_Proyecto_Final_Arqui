package com.finwise.finwise_backend.transactions.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TransactionCreateDTO {
    private BigDecimal amount;
    private LocalDate date;
    private String description;
    private Long categoryId;
    private String type; // "INCOME" or "EXPENSE"
}
