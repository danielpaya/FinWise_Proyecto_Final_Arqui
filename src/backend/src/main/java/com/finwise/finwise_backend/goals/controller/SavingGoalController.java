package com.finwise.finwise_backend.goals.controller;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import com.finwise.finwise_backend.goals.dto.GoalRequest;
import com.finwise.finwise_backend.goals.dto.GoalResponse;
import com.finwise.finwise_backend.goals.service.SavingGoalService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/goals")
@RequiredArgsConstructor
@Tag(name = "Goals", description = "Saving goal management endpoints")
public class SavingGoalController {
    
    private final SavingGoalService goalService;
    
    @GetMapping
    @Operation(summary = "Get all goals")
    public ApiResponse<List<GoalResponse>> getAllGoals() {
        return ApiResponse.success(goalService.getAllGoals());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get goal by ID")
    public ApiResponse<GoalResponse> getGoalById(@PathVariable Long id) {
        return ApiResponse.success(goalService.getGoalById(id));
    }
    
    @PostMapping
    @Operation(summary = "Create a new goal")
    public ApiResponse<GoalResponse> createGoal(@Valid @RequestBody GoalRequest request) {
        return ApiResponse.success("Goal created successfully", goalService.createGoal(request));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update goal")
    public ApiResponse<GoalResponse> updateGoal(
            @PathVariable Long id,
            @Valid @RequestBody GoalRequest request) {
        return ApiResponse.success("Goal updated successfully", goalService.updateGoal(id, request));
    }
    
    @PostMapping("/{id}/contribute")
    @Operation(summary = "Contribute to goal")
    public ApiResponse<GoalResponse> contributeToGoal(
            @PathVariable Long id,
            @RequestParam BigDecimal amount) {
        return ApiResponse.success("Contribution added successfully", goalService.contributeToGoal(id, amount));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete goal")
    public ApiResponse<Void> deleteGoal(@PathVariable Long id) {
        goalService.deleteGoal(id);
        return ApiResponse.success("Goal deleted successfully", null);
    }
}
