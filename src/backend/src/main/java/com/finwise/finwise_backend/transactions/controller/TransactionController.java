package com.finwise.finwise_backend.transactions.controller;

import com.finwise.finwise_backend.shared.dto.ApiResponse;
import com.finwise.finwise_backend.shared.enums.TransactionType;
import com.finwise.finwise_backend.transactions.dto.TransactionRequest;
import com.finwise.finwise_backend.transactions.dto.TransactionResponse;
import com.finwise.finwise_backend.transactions.service.TransactionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@RequiredArgsConstructor
@Tag(name = "Transactions", description = "Transaction management endpoints")
public class TransactionController {
    
    private final TransactionService transactionService;
    
    @GetMapping
    @Operation(summary = "Get all transactions")
    public ApiResponse<List<TransactionResponse>> getAllTransactions() {
        return ApiResponse.success(transactionService.getAllTransactions());
    }
    
    @GetMapping("/{id}")
    @Operation(summary = "Get transaction by ID")
    public ApiResponse<TransactionResponse> getTransactionById(@PathVariable Long id) {
        return ApiResponse.success(transactionService.getTransactionById(id));
    }
    
    @GetMapping("/type/{type}")
    @Operation(summary = "Get transactions by type")
    public ApiResponse<List<TransactionResponse>> getTransactionsByType(@PathVariable TransactionType type) {
        return ApiResponse.success(transactionService.getTransactionsByType(type));
    }
    
    @PostMapping
    @Operation(summary = "Create a new transaction")
    public ApiResponse<TransactionResponse> createTransaction(@Valid @RequestBody TransactionRequest request) {
        return ApiResponse.success("Transaction created successfully", transactionService.createTransaction(request));
    }
    
    @PutMapping("/{id}")
    @Operation(summary = "Update transaction")
    public ApiResponse<TransactionResponse> updateTransaction(
            @PathVariable Long id,
            @Valid @RequestBody TransactionRequest request) {
        return ApiResponse.success("Transaction updated successfully", transactionService.updateTransaction(id, request));
    }
    
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete transaction")
    public ApiResponse<Void> deleteTransaction(@PathVariable Long id) {
        transactionService.deleteTransaction(id);
        return ApiResponse.success("Transaction deleted successfully", null);
    }
}
