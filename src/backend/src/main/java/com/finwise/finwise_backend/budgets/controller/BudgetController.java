package com.finwise.finwise_backend.budgets.controller;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import com.finwise.finwise_backend.budgets.dto.BudgetRequest;
import com.finwise.finwise_backend.budgets.dto.BudgetResponse;
import com.finwise.finwise_backend.budgets.service.BudgetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/budgets")
@RequiredArgsConstructor
@Tag(name = "Budgets", description = "Budget management endpoints")
public class BudgetController {
    
    private final BudgetService budgetService;
    
    @GetMapping
    @Operation(summary = "Get all budgets")
    public ApiResponse<List<BudgetResponse>> getAllBudgets() {
        return ApiResponse.success(budgetService.getAllBudgets());
    }
    
    @GetMapping("/current")
    @Operation(summary = "Get current month budgets")
    public ApiResponse<List<BudgetResponse>> getCurrentMonthBudgets() {
        return ApiResponse.success(budgetService.getCurrentMonthBudgets());
    }
    
    @GetMapping("/month/{month}/year/{year}")
    @Operation(summary = "Get budgets by month and year")
    public ApiResponse<List<BudgetResponse>> getBudgetsByMonth(
            @PathVariable Integer month,
            @PathVariable Integer year) {
        return ApiResponse.success(budgetService.getBudgetsByMonth(month, year));
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get budget by ID")
    public ApiResponse<BudgetResponse> getBudgetById(@PathVariable Long id) {
        return ApiResponse.success(budgetService.getBudgetById(id));
    }
    
    @PostMapping
    @Operation(summary = "Create a new budget")
    public ApiResponse<BudgetResponse> createBudget(@Valid @RequestBody BudgetRequest request) {
        return ApiResponse.success("Budget created successfully", budgetService.createBudget(request));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update budget")
    public ApiResponse<BudgetResponse> updateBudget(
            @PathVariable Long id,
            @Valid @RequestBody BudgetRequest request) {
        return ApiResponse.success("Budget updated successfully", budgetService.updateBudget(id, request));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete budget")
    public ApiResponse<Void> deleteBudget(@PathVariable Long id) {
        budgetService.deleteBudget(id);
        return ApiResponse.success("Budget deleted successfully", null);
    }
}
