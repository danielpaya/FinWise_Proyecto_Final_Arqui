package com.finwise.finwise_backend.simulation.dto;

import com.finwise.finwise_backend.shared.enums.RiskLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class InvestmentSimulationCreateDTO {
    private BigDecimal initialAmount;
    private BigDecimal monthlyContribution;
    private Integer years;
    private RiskLevel riskProfile;
}
