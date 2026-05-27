package com.finwise.finwise_backend.budgets.repository;

import com.finwise.finwise_backend.budgets.model.Budget;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BudgetRepository extends JpaRepository<Budget, Long> {

    List<Budget> findByMonthAndYear(Integer month, Integer year);

    List<Budget> findByUserId(Long userId);

    List<Budget> findByUserIdAndMonthAndYear(Long userId, Integer month, Integer year);
}