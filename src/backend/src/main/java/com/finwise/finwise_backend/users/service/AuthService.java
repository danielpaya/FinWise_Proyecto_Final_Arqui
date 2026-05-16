package com.finwise.finwise_backend.users.service;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import com.finwise.finwise_backend.shared.enums.Role;
import com.finwise.finwise_backend.users.dto.LoginRequest;
import com.finwise.finwise_backend.users.dto.RegisterRequest;
import com.finwise.finwise_backend.users.dto.UserResponse;
import com.finwise.finwise_backend.users.model.User;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class AuthService {
    
    private final AtomicLong idCounter = new AtomicLong(1);
    private final Map<String, User> mockUsers = new HashMap<>();
    
    public AuthService() {
        // Initialize with some mock data
        User mockUser = new User();
        mockUser.setId(idCounter.getAndIncrement());
        mockUser.setName("Test User");
        mockUser.setEmail("test@example.com");
        mockUser.setPassword("password123");
        mockUser.setRole(Role.USER);
        mockUser.setCreatedAt(LocalDateTime.now());
        mockUsers.put("test@example.com", mockUser);
    }
    
    public ApiResponse<UserResponse> register(RegisterRequest request) {
        // Check if email already exists
        if (mockUsers.containsKey(request.getEmail())) {
            return ApiResponse.error("Email already registered");
        }
        
        // Create new user
        User user = new User();
        user.setId(idCounter.getAndIncrement());
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); // In real app, this would be encrypted
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);
        user.setCreatedAt(LocalDateTime.now());
        
        mockUsers.put(user.getEmail(), user);
        
        UserResponse response = mapToResponse(user);
        return ApiResponse.success("User registered successfully", response);
    }
    
    public ApiResponse<Map<String, Object>> login(LoginRequest request) {
        User user = mockUsers.get(request.getEmail());
        
        if (user == null) {
            return ApiResponse.error("Invalid email or password");
        }
        
        if (!user.getPassword().equals(request.getPassword())) {
            return ApiResponse.error("Invalid email or password");
        }
        
        // In real app, this would return a JWT token
        Map<String, Object> loginResponse = new HashMap<>();
        loginResponse.put("user", mapToResponse(user));
        loginResponse.put("token", "mock-jwt-token-" + user.getId()); // Mock token
        
        return ApiResponse.success("Login successful", loginResponse);
    }
    
    private UserResponse mapToResponse(User user) {
        UserResponse response = new UserResponse();
        response.setId(user.getId());
        response.setName(user.getName());
        response.setEmail(user.getEmail());
        response.setRole(user.getRole());
        response.setCreatedAt(user.getCreatedAt());
        return response;
    }
}
