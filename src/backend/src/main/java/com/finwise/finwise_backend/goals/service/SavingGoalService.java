package com.finwise.finwise_backend.goals.service;

import com.finwise.finwise_backend.goals.dto.GoalRequest;
import com.finwise.finwise_backend.goals.dto.GoalResponse;
import com.finwise.finwise_backend.goals.model.SavingGoal;
import com.finwise.finwise_backend.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class SavingGoalService {
    
    private final AtomicLong idCounter = new AtomicLong(1);
    private final Map<Long, SavingGoal> mockGoals = new ConcurrentHashMap<>();
    
    public SavingGoalService() {
        initializeMockData();
    }
    
    private void initializeMockData() {
        // Create mock goals
        SavingGoal g1 = createMockGoal(1L, "Emergency Fund", BigDecimal.valueOf(10000), BigDecimal.valueOf(2500), LocalDate.now().plusMonths(6));
        SavingGoal g2 = createMockGoal(2L, "New Laptop", BigDecimal.valueOf(1500), BigDecimal.valueOf(750), LocalDate.now().plusMonths(2));
        SavingGoal g3 = createMockGoal(3L, "Vacation", BigDecimal.valueOf(3000), BigDecimal.valueOf(500), LocalDate.now().plusMonths(12));
        
        mockGoals.put(1L, g1);
        mockGoals.put(2L, g2);
        mockGoals.put(3L, g3);
    }
    
    private SavingGoal createMockGoal(Long id, String name, BigDecimal targetAmount, BigDecimal currentAmount, LocalDate deadline) {
        SavingGoal goal = new SavingGoal();
        goal.setId(id);
        goal.setName(name);
        goal.setTargetAmount(targetAmount);
        goal.setCurrentAmount(currentAmount);
        goal.setDeadline(deadline);
        return goal;
    }
    
    public List<GoalResponse> getAllGoals() {
        return mockGoals.values().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    
    public GoalResponse getGoalById(Long id) {
        SavingGoal goal = mockGoals.get(id);
        if (goal == null) {
            throw new ResourceNotFoundException("Goal", id);
        }
        return mapToResponse(goal);
    }
    
    public GoalResponse createGoal(GoalRequest request) {
        SavingGoal goal = createMockGoal(
                idCounter.getAndIncrement(),
                request.getName(),
                request.getTargetAmount(),
                BigDecimal.ZERO,
                request.getDeadline()
        );
        
        mockGoals.put(goal.getId(), goal);
        return mapToResponse(goal);
    }
    
    public GoalResponse updateGoal(Long id, GoalRequest request) {
        SavingGoal goal = mockGoals.get(id);
        if (goal == null) {
            throw new ResourceNotFoundException("Goal", id);
        }
        
        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setDeadline(request.getDeadline());
        
        return mapToResponse(goal);
    }
    
    public GoalResponse contributeToGoal(Long id, BigDecimal amount) {
        SavingGoal goal = mockGoals.get(id);
        if (goal == null) {
            throw new ResourceNotFoundException("Goal", id);
        }
        
        goal.setCurrentAmount(goal.getCurrentAmount().add(amount));
        return mapToResponse(goal);
    }
    
    public void deleteGoal(Long id) {
        SavingGoal goal = mockGoals.get(id);
        if (goal == null) {
            throw new ResourceNotFoundException("Goal", id);
        }
        mockGoals.remove(id);
    }
    
    private GoalResponse mapToResponse(SavingGoal goal) {
        GoalResponse response = new GoalResponse();
        response.setId(goal.getId());
        response.setName(goal.getName());
        response.setTargetAmount(goal.getTargetAmount());
        response.setCurrentAmount(goal.getCurrentAmount());
        response.setProgress(calculateProgress(goal.getCurrentAmount(), goal.getTargetAmount()));
        response.setDeadline(goal.getDeadline());
        response.setAchieved(goal.getCurrentAmount().compareTo(goal.getTargetAmount()) >= 0);
        return response;
    }
    
    private BigDecimal calculateProgress(BigDecimal current, BigDecimal target) {
        if (target.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }
        return current.multiply(BigDecimal.valueOf(100))
                .divide(target, 2, RoundingMode.HALF_UP);
    }
}
