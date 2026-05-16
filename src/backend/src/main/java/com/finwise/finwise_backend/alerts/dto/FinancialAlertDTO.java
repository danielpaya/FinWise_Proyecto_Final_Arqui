package com.finwise.finwise_backend.alerts.dto;

import com.finwise.finwise_backend.shared.enums.AlertType;
import com.finwise.finwise_backend.users.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialAlertDTO {
    private Long id;
    private String message;
    private AlertType type;
    private LocalDateTime createdAt;
    private Boolean read;
    private UserDTO user;
}
