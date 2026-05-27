package com.finwise.finwise_backend.reports.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.Immutable;

import java.math.BigDecimal;

@Entity
@Immutable
@Table(name = "vw_user_dashboard")
public class UserDashboardView {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "full_name")
    private String fullName;

    @Column(name = "total_income")
    private BigDecimal totalIncome;

    @Column(name = "total_expense")
    private BigDecimal totalExpense;

    @Column(name = "current_balance")
    private BigDecimal currentBalance;

    @Column(name = "total_transactions")
    private Long totalTransactions;

    @Column(name = "active_budgets")
    private Long activeBudgets;

    @Column(name = "active_goals")
    private Long activeGoals;

    @Column(name = "unread_alerts")
    private Long unreadAlerts;

    public Long getUserId() {
        return userId;
    }

    public String getFullName() {
        return fullName;
    }

    public BigDecimal getTotalIncome() {
        return totalIncome;
    }

    public BigDecimal getTotalExpense() {
        return totalExpense;
    }

    public BigDecimal getCurrentBalance() {
        return currentBalance;
    }

    public Long getTotalTransactions() {
        return totalTransactions;
    }

    public Long getActiveBudgets() {
        return activeBudgets;
    }

    public Long getActiveGoals() {
        return activeGoals;
    }

    public Long getUnreadAlerts() {
        return unreadAlerts;
    }
}