package com.finwise.finwise_backend.goals.service;

import com.finwise.finwise_backend.goals.dto.GoalRequest;
import com.finwise.finwise_backend.goals.dto.GoalResponse;
import com.finwise.finwise_backend.goals.model.SavingGoal;
import com.finwise.finwise_backend.goals.repository.SavingGoalRepository;
import com.finwise.finwise_backend.shared.exception.ResourceNotFoundException;
import com.finwise.finwise_backend.users.model.User;
import com.finwise.finwise_backend.users.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SavingGoalService {

    private final SavingGoalRepository savingGoalRepository;
    private final UserRepository userRepository;

    public List<GoalResponse> getAllGoals() {
        return savingGoalRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<GoalResponse> getGoalsByUser(Long userId) {
        return savingGoalRepository.findByUserId(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public GoalResponse getGoalById(Long id) {
        SavingGoal goal = savingGoalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal", id));

        return mapToResponse(goal);
    }

    public GoalResponse createGoal(GoalRequest request) {
        User user = userRepository.findById(1L)
                .orElseThrow(() -> new ResourceNotFoundException("User", 1L));

        SavingGoal goal = new SavingGoal();
        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setCurrentAmount(BigDecimal.ZERO);
        goal.setDeadline(request.getDeadline());
        goal.setUser(user);

        SavingGoal savedGoal = savingGoalRepository.save(goal);

        return mapToResponse(savedGoal);
    }

    public GoalResponse updateGoal(Long id, GoalRequest request) {
        SavingGoal goal = savingGoalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal", id));

        goal.setName(request.getName());
        goal.setTargetAmount(request.getTargetAmount());
        goal.setDeadline(request.getDeadline());

        SavingGoal updatedGoal = savingGoalRepository.save(goal);

        return mapToResponse(updatedGoal);
    }

    public GoalResponse contributeToGoal(Long id, BigDecimal amount) {
        SavingGoal goal = savingGoalRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Goal", id));

        goal.setCurrentAmount(goal.getCurrentAmount().add(amount));

        SavingGoal updatedGoal = savingGoalRepository.save(goal);

        return mapToResponse(updatedGoal);
    }

    public void deleteGoal(Long id) {
        if (!savingGoalRepository.existsById(id)) {
            throw new ResourceNotFoundException("Goal", id);
        }

        savingGoalRepository.deleteById(id);
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
        if (target == null || target.compareTo(BigDecimal.ZERO) == 0) {
            return BigDecimal.ZERO;
        }

        return current.multiply(BigDecimal.valueOf(100))
                .divide(target, 2, RoundingMode.HALF_UP);
    }
}