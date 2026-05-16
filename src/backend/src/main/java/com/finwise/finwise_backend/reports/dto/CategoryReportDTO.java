package com.finwise.finwise_backend.reports.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CategoryReportDTO {
    private String categoryName;
    private String categoryType;
    private BigDecimal totalAmount;
    private Integer transactionCount;
    private BigDecimal averageAmount;
}
