package com.finwise.finwise_backend.users.service;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import com.finwise.finwise_backend.shared.enums.Role;
import com.finwise.finwise_backend.users.dto.LoginRequest;
import com.finwise.finwise_backend.users.dto.RegisterRequest;
import com.finwise.finwise_backend.users.dto.UserResponse;
import com.finwise.finwise_backend.users.model.User;
import com.finwise.finwise_backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;

    public ApiResponse<UserResponse> register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return ApiResponse.error("Email already registered");
        }

        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setRole(request.getRole() != null ? request.getRole() : Role.USER);

        User savedUser = userRepository.save(user);

        return ApiResponse.success(
                "User registered successfully",
                mapToResponse(savedUser)
        );
    }

    public ApiResponse<Map<String, Object>> login(LoginRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return ApiResponse.error("Invalid email or password");
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return ApiResponse.error("Invalid email or password");
        }

        Map<String, Object> loginResponse = new HashMap<>();
        loginResponse.put("user", mapToResponse(user));
        loginResponse.put("token", "simple-session-user-" + user.getId());

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