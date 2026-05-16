package com.finwise.finwise_backend.reports.service;

import com.finwise.finwise_backend.reports.dto.CategoryReportDTO;
import com.finwise.finwise_backend.reports.dto.MonthlyReportDTO;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.YearMonth;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ReportService {
    
    public MonthlyReportDTO generateMonthlyReport(Integer month, Integer year) {
        MonthlyReportDTO report = new MonthlyReportDTO();
        report.setMonth(month);
        report.setYear(year);
        
        // Mock data
        BigDecimal totalIncome = BigDecimal.valueOf(5000);
        BigDecimal totalExpenses = BigDecimal.valueOf(2300);
        
        report.setTotalIncome(totalIncome);
        report.setTotalExpenses(totalExpenses);
        report.setBalance(totalIncome.subtract(totalExpenses));
        
        // Mock expenses by category
        Map<String, BigDecimal> expensesByCategory = new HashMap<>();
        expensesByCategory.put("Food", BigDecimal.valueOf(800));
        expensesByCategory.put("Transport", BigDecimal.valueOf(300));
        expensesByCategory.put("Entertainment", BigDecimal.valueOf(500));
        expensesByCategory.put("Utilities", BigDecimal.valueOf(400));
        expensesByCategory.put("Others", BigDecimal.valueOf(300));
        report.setExpensesByCategory(expensesByCategory);
        
        // Mock income by category
        Map<String, BigDecimal> incomeByCategory = new HashMap<>();
        incomeByCategory.put("Salary", BigDecimal.valueOf(4500));
        incomeByCategory.put("Freelance", BigDecimal.valueOf(500));
        report.setIncomeByCategory(incomeByCategory);
        
        return report;
    }
    
    public List<CategoryReportDTO> generateCategoryReport(String categoryType) {
        // Mock data for category report
        CategoryReportDTO food = new CategoryReportDTO();
        food.setCategoryName("Food");
        food.setCategoryType(categoryType);
        food.setTotalAmount(BigDecimal.valueOf(800));
        food.setTransactionCount(15);
        food.setAverageAmount(BigDecimal.valueOf(53.33));
        
        CategoryReportDTO transport = new CategoryReportDTO();
        transport.setCategoryName("Transport");
        transport.setCategoryType(categoryType);
        transport.setTotalAmount(BigDecimal.valueOf(300));
        transport.setTransactionCount(20);
        transport.setAverageAmount(BigDecimal.valueOf(15.00));
        
        CategoryReportDTO entertainment = new CategoryReportDTO();
        entertainment.setCategoryName("Entertainment");
        entertainment.setCategoryType(categoryType);
        entertainment.setTotalAmount(BigDecimal.valueOf(500));
        entertainment.setTransactionCount(8);
        entertainment.setAverageAmount(BigDecimal.valueOf(62.50));
        
        return List.of(food, transport, entertainment);
    }
}
