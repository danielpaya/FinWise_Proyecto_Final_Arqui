package com.finwise.finwise_backend.reports.controller;

import com.finwise.finwise_backend.reports.dto.CategoryReportDTO;
import com.finwise.finwise_backend.reports.dto.MonthlyReportDTO;
import com.finwise.finwise_backend.reports.service.ReportService;
import com.finwise.finwise_backend.shared.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.YearMonth;
import java.util.List;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
@Tag(name = "Reports", description = "Financial report endpoints")
public class ReportController {
    
    private final ReportService reportService;
    
    @GetMapping("/monthly")
    @Operation(summary = "Get monthly financial report")
    public ApiResponse<MonthlyReportDTO> getMonthlyReport(
            @RequestParam(defaultValue = "#{T(java.time.YearMonth).now().getMonthValue()}") Integer month,
            @RequestParam(defaultValue = "#{T(java.time.YearMonth).now().getYear()}") Integer year) {
        return ApiResponse.success(reportService.generateMonthlyReport(month, year));
    }
    
    @GetMapping("/categories")
    @Operation(summary = "Get category report")
    public ApiResponse<List<CategoryReportDTO>> getCategoryReport(
            @RequestParam(defaultValue = "EXPENSE") String categoryType) {
        return ApiResponse.success(reportService.generateCategoryReport(categoryType));
    }
}
