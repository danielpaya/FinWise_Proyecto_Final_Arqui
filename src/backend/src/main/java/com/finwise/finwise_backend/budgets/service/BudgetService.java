package com.finwise.finwise_backend.budgets.service;

import com.finwise.finwise_backend.budgets.dto.BudgetRequest;
import com.finwise.finwise_backend.budgets.dto.BudgetResponse;
import com.finwise.finwise_backend.budgets.model.Budget;
import com.finwise.finwise_backend.categories.model.Category;
import com.finwise.finwise_backend.shared.enums.CategoryType;
import com.finwise.finwise_backend.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.YearMonth;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class BudgetService {
    
    private final AtomicLong idCounter = new AtomicLong(1);
    private final Map<Long, Budget> mockBudgets = new ConcurrentHashMap<>();
    private final Map<Long, Category> mockCategories = new ConcurrentHashMap<>();
    
    public BudgetService() {
        initializeMockData();
    }
    
    private void initializeMockData() {
        // Create mock categories
        Category food = new Category(1L, "Food", CategoryType.EXPENSE, "#FF5722");
        Category transport = new Category(2L, "Transport", CategoryType.EXPENSE, "#2196F3");
        Category entertainment = new Category(3L, "Entertainment", CategoryType.EXPENSE, "#9C27B0");
        
        mockCategories.put(1L, food);
        mockCategories.put(2L, transport);
        mockCategories.put(3L, entertainment);
        
        YearMonth currentMonth = YearMonth.now();
        
        // Create mock budgets
        Budget b1 = createMockBudget(1L, BigDecimal.valueOf(500), currentMonth.getMonthValue(), currentMonth.getYear(), food, BigDecimal.valueOf(150));
        Budget b2 = createMockBudget(2L, BigDecimal.valueOf(200), currentMonth.getMonthValue(), currentMonth.getYear(), transport, BigDecimal.valueOf(50));
        Budget b3 = createMockBudget(3L, BigDecimal.valueOf(300), currentMonth.getMonthValue(), currentMonth.getYear(), entertainment, BigDecimal.valueOf(100));
        
        mockBudgets.put(1L, b1);
        mockBudgets.put(2L, b2);
        mockBudgets.put(3L, b3);
    }
    
    private Budget createMockBudget(Long id, BigDecimal limitAmount, Integer month, Integer year, Category category, BigDecimal spentAmount) {
        Budget budget = new Budget();
        budget.setId(id);
        budget.setLimitAmount(limitAmount);
        budget.setSpentAmount(spentAmount);
        budget.setMonth(month);
        budget.setYear(year);
        budget.setCategory(category);
        return budget;
    }
    
    public List<BudgetResponse> getAllBudgets() {
        return mockBudgets.values().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<BudgetResponse> getBudgetsByMonth(Integer month, Integer year) {
        return mockBudgets.values().stream()
                .filter(b -> b.getMonth().equals(month) && b.getYear().equals(year))
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public List<BudgetResponse> getCurrentMonthBudgets() {
        YearMonth currentMonth = YearMonth.now();
        return getBudgetsByMonth(currentMonth.getMonthValue(), currentMonth.getYear());
    }
    
    public BudgetResponse getBudgetById(Long id) {
        Budget budget = mockBudgets.get(id);
        if (budget == null) {
            throw new ResourceNotFoundException("Budget", id);
        }
        return mapToResponse(budget);
    }
    
    public BudgetResponse createBudget(BudgetRequest request) {
        Category category = mockCategories.get(request.getCategoryId());
        if (category == null) {
            throw new ResourceNotFoundException("Category", request.getCategoryId());
        }
        
        Budget budget = createMockBudget(
                idCounter.getAndIncrement(),
                request.getLimitAmount(),
                request.getMonth(),
                request.getYear(),
                category,
                BigDecimal.ZERO
        );
        
        mockBudgets.put(budget.getId(), budget);
        return mapToResponse(budget);
    }
    
    public BudgetResponse updateBudget(Long id, BudgetRequest request) {
        Budget budget = mockBudgets.get(id);
        if (budget == null) {
            throw new ResourceNotFoundException("Budget", id);
        }
        
        Category category = mockCategories.get(request.getCategoryId());
        if (category == null) {
            throw new ResourceNotFoundException("Category", request.getCategoryId());
        }
        
        budget.setLimitAmount(request.getLimitAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setCategory(category);
        
        return mapToResponse(budget);
    }
    
    public void deleteBudget(Long id) {
        Budget budget = mockBudgets.get(id);
        if (budget == null) {
            throw new ResourceNotFoundException("Budget", id);
        }
        mockBudgets.remove(id);
    }
    
    private BudgetResponse mapToResponse(Budget budget) {
        BudgetResponse response = new BudgetResponse();
        response.setId(budget.getId());
        response.setLimitAmount(budget.getLimitAmount());
        response.setSpentAmount(budget.getSpentAmount());
        response.setRemainingAmount(budget.getLimitAmount().subtract(budget.getSpentAmount()));
        response.setMonth(budget.getMonth());
        response.setYear(budget.getYear());
        response.setCategoryName(budget.getCategory().getName());
        return response;
    }
}
