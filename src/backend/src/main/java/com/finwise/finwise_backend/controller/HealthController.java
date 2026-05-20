package com.finwise.finwise_backend.controller;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestController
@Tag(name = "Health", description = "Health check endpoints")
public class HealthController {

    @GetMapping("/health")
    @Operation(summary = "Health check endpoint")
    public ApiResponse<Map<String, Object>> health() {
        Map<String, Object> healthData = new HashMap<>();
        healthData.put("status", "UP");
        healthData.put("application", "FinWise Backend");
        healthData.put("version", "1.0.0");
        healthData.put("timestamp", LocalDateTime.now());
        healthData.put("description", "Arquitectura modular implementada - Persona 1 completada");
        
        return ApiResponse.success("Backend is healthy", healthData);
    }
}