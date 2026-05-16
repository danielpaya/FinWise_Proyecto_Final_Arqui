package com.finwise.finwise_backend.ai.model;

import com.finwise.finwise_backend.shared.enums.RiskLevel;
import com.finwise.finwise_backend.users.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialProfile {
    private Long id;
    private RiskLevel riskLevel;
    private BigDecimal savingCapacity;
    private BigDecimal monthlyBalance;
    private User user;
}
