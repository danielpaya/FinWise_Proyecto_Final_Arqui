package com.finwise.finwise_backend.transactions.service;

import com.finwise.finwise_backend.categories.dto.CategoryDTO;
import com.finwise.finwise_backend.categories.model.Category;
import com.finwise.finwise_backend.shared.enums.TransactionType;
import com.finwise.finwise_backend.shared.exception.ResourceNotFoundException;
import com.finwise.finwise_backend.transactions.dto.TransactionRequest;
import com.finwise.finwise_backend.transactions.dto.TransactionResponse;
import com.finwise.finwise_backend.transactions.model.Income;
import com.finwise.finwise_backend.transactions.model.Transaction;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class TransactionService {
    
    private final AtomicLong idCounter = new AtomicLong(1);
    private final Map<Long, Transaction> mockTransactions = new ConcurrentHashMap<>();
    private final Map<Long, Category> mockCategories = new ConcurrentHashMap<>();
    
    public TransactionService() {
        // Initialize mock categories
        initializeMockData();
    }
    
    private void initializeMockData() {
        // Create mock categories
        Category salary = new Category(1L, "Salary", TransactionType.INCOME, "#4CAF50");
        Category food = new Category(2L, "Food", TransactionType.EXPENSE, "#FF5722");
        Category transport = new Category(3L, "Transport", TransactionType.EXPENSE, "#2196F3");
        Category entertainment = new Category(4L, "Entertainment", TransactionType.EXPENSE, "#9C27B0");
        
        mockCategories.put(1L, salary);
        mockCategories.put(2L, food);
        mockCategories.put(3L, transport);
        mockCategories.put(4L, entertainment);
        
        // Create mock transactions
        Transaction t1 = createMockTransaction(1L, BigDecimal.valueOf(5000), "Monthly salary", LocalDate.now(), salary, TransactionType.INCOME);
        Transaction t2 = createMockTransaction(2L, BigDecimal.valueOf(150), "Groceries", LocalDate.now(), food, TransactionType.EXPENSE);
        Transaction t3 = createMockTransaction(3L, BigDecimal.valueOf(50), "Bus pass", LocalDate.now(), transport, TransactionType.EXPENSE);
        Transaction t4 = createMockTransaction(4L, BigDecimal.valueOf(100), "Movies", LocalDate.now(), entertainment, TransactionType.EXPENSE);
        
        mockTransactions.put(1L, t1);
        mockTransactions.put(2L, t2);
        mockTransactions.put(3L, t3);
        mockTransactions.put(4L, t4);
    }
    
    private Transaction createMockTransaction(Long id, BigDecimal amount, String description, LocalDate date, Category category, TransactionType type) {
        Transaction transaction;
        if (type == TransactionType.INCOME) {
            transaction = new Income();
        } else {
            transaction = new com.finwise.finwise_backend.transactions.model.Expense();
        }
        transaction.setId(id);
        transaction.setAmount(amount);
        transaction.setDescription(description);
        transaction.setDate(date);
        transaction.setCategory(category);
        return transaction;
    }
    
    public List<TransactionResponse> getAllTransactions() {
        return mockTransactions.values().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public TransactionResponse getTransactionById(Long id) {
        Transaction transaction = mockTransactions.get(id);
        if (transaction == null) {
            throw new ResourceNotFoundException("Transaction", id);
        }
        return mapToResponse(transaction);
    }
    
    public List<TransactionResponse> getTransactionsByType(TransactionType type) {
        return mockTransactions.values().stream()
                .filter(t -> {
                    if (type == TransactionType.INCOME) {
                        return t instanceof Income;
                    } else {
                        return t instanceof com.finwise.finwise_backend.transactions.model.Expense;
                    }
                })
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public TransactionResponse createTransaction(TransactionRequest request) {
        Category category = mockCategories.get(request.getCategoryId());
        if (category == null) {
            throw new ResourceNotFoundException("Category", request.getCategoryId());
        }
        
        Transaction transaction = createMockTransaction(
                idCounter.getAndIncrement(),
                request.getAmount(),
                request.getDescription(),
                request.getDate(),
                category,
                request.getType()
        );
        
        mockTransactions.put(transaction.getId(), transaction);
        return mapToResponse(transaction);
    }
    
    public TransactionResponse updateTransaction(Long id, TransactionRequest request) {
        Transaction transaction = mockTransactions.get(id);
        if (transaction == null) {
            throw new ResourceNotFoundException("Transaction", id);
        }
        
        Category category = mockCategories.get(request.getCategoryId());
        if (category == null) {
            throw new ResourceNotFoundException("Category", request.getCategoryId());
        }
        
        transaction.setAmount(request.getAmount());
        transaction.setDescription(request.getDescription());
        transaction.setDate(request.getDate());
        transaction.setCategory(category);
        
        return mapToResponse(transaction);
    }
    
    public void deleteTransaction(Long id) {
        Transaction transaction = mockTransactions.get(id);
        if (transaction == null) {
            throw new ResourceNotFoundException("Transaction", id);
        }
        mockTransactions.remove(id);
    }
    
    private TransactionResponse mapToResponse(Transaction transaction) {
        TransactionResponse response = new TransactionResponse();
        response.setId(transaction.getId());
        response.setAmount(transaction.getAmount());
        response.setDescription(transaction.getDescription());
        response.setDate(transaction.getDate());
        response.setCategory(mapCategoryToDTO(transaction.getCategory()));
        response.setType(transaction instanceof Income ? TransactionType.INCOME : TransactionType.EXPENSE);
        return response;
    }
    
    private CategoryDTO mapCategoryToDTO(Category category) {
        CategoryDTO dto = new CategoryDTO();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setType(category.getType());
        dto.setColor(category.getColor());
        return dto;
    }
}
