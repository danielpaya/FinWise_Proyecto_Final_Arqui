package com.finwise.finwise_backend.alerts.model;

import com.finwise.finwise_backend.shared.enums.AlertType;
import com.finwise.finwise_backend.users.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FinancialAlert {
    private Long id;
    private String message;
    private AlertType type;
    private LocalDateTime createdAt;
    private Boolean read;
    private User user;
}
