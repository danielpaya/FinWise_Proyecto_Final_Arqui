package com.finwise.finwise_backend.budgets.service;

import com.finwise.finwise_backend.budgets.dto.BudgetRequest;
import com.finwise.finwise_backend.budgets.dto.BudgetResponse;
import com.finwise.finwise_backend.budgets.model.Budget;
import com.finwise.finwise_backend.budgets.repository.BudgetRepository;
import com.finwise.finwise_backend.categories.model.Category;
import com.finwise.finwise_backend.categories.repository.CategoryRepository;
import com.finwise.finwise_backend.shared.exception.ResourceNotFoundException;
import com.finwise.finwise_backend.users.model.User;
import com.finwise.finwise_backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BudgetService {

    private final BudgetRepository budgetRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;

    public List<BudgetResponse> getAllBudgets() {
        return budgetRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BudgetResponse> getBudgetsByMonth(Integer month, Integer year) {
        return budgetRepository.findByMonthAndYear(month, year)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BudgetResponse> getCurrentMonthBudgets() {
        YearMonth currentMonth = YearMonth.now();
        return getBudgetsByMonth(currentMonth.getMonthValue(), currentMonth.getYear());
    }

    public List<BudgetResponse> getBudgetsByUser(Long userId) {
        return budgetRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<BudgetResponse> getBudgetsByUserAndMonth(Long userId, Integer month, Integer year) {
        return budgetRepository.findByUserIdAndMonthAndYear(userId, month, year)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BudgetResponse getBudgetById(Long id) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget", id));

        return mapToResponse(budget);
    }

    public BudgetResponse createBudget(BudgetRequest request) {
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        User user = userRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("User", 1L));

        Budget budget = new Budget();
        budget.setLimitAmount(request.getLimitAmount());
        budget.setSpentAmount(BigDecimal.ZERO);
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setCategory(category);
        budget.setUser(user);

        Budget savedBudget = budgetRepository.save(budget);

        return mapToResponse(savedBudget);
    }

    public BudgetResponse updateBudget(Long id, BudgetRequest request) {
        Budget budget = budgetRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Budget", id));

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", request.getCategoryId()));

        budget.setLimitAmount(request.getLimitAmount());
        budget.setMonth(request.getMonth());
        budget.setYear(request.getYear());
        budget.setCategory(category);

        Budget updatedBudget = budgetRepository.save(budget);

        return mapToResponse(updatedBudget);
    }

    public void deleteBudget(Long id) {
        if (!budgetRepository.existsById(id)) {
            throw new ResourceNotFoundException("Budget", id);
        }

        budgetRepository.deleteById(id);
    }

    private BudgetResponse mapToResponse(Budget budget) {
        BigDecimal spentAmount = budget.getSpentAmount() != null
                ? budget.getSpentAmount()
                : BigDecimal.ZERO;

        BudgetResponse response = new BudgetResponse();
        response.setId(budget.getId());
        response.setLimitAmount(budget.getLimitAmount());
        response.setSpentAmount(spentAmount);
        response.setRemainingAmount(budget.getLimitAmount().subtract(spentAmount));
        response.setMonth(budget.getMonth());
        response.setYear(budget.getYear());
        response.setCategoryName(
                budget.getCategory() != null ? budget.getCategory().getName() : "No category"
        );

        return response;
    }
}