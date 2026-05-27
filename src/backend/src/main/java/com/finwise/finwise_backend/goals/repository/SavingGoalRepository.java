package com.finwise.finwise_backend.goals.repository;

import com.finwise.finwise_backend.goals.model.SavingGoal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SavingGoalRepository extends JpaRepository<SavingGoal, Long> {

    List<SavingGoal> findByUserId(Long userId);
}