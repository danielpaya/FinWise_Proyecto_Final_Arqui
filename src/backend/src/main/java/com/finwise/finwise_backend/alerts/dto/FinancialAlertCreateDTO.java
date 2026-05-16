package com.finwise.finwise_backend.alerts.dto;

import com.finwise.finwise_backend.shared.enums.AlertType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialAlertCreateDTO {
    private String message;
    private AlertType type;
}
