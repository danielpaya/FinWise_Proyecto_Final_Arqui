package com.finwise.finwise_backend.ai.dto;

import com.finwise.finwise_backend.shared.enums.RiskLevel;
import com.finwise.finwise_backend.users.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialProfileDTO {
    private Long id;
    private RiskLevel riskLevel;
    private BigDecimal savingCapacity;
    private BigDecimal monthlyBalance;
    private UserDTO user;
}
