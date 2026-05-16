package com.finwise.finwise_backend.users.controller;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import com.finwise.finwise_backend.users.dto.LoginRequest;
import com.finwise.finwise_backend.users.dto.RegisterRequest;
import com.finwise.finwise_backend.users.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Authentication endpoints")
public class AuthController {
    
    private final AuthService authService;
    
    @PostMapping("/register")
    @Operation(summary = "Register a new user")
    public ApiResponse<?> register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    
    @PostMapping("/login")
    @Operation(summary = "Login user")
    public ApiResponse<Map<String, Object>> login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
