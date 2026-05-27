package com.finwise.finwise_backend.reports.repository;

import com.finwise.finwise_backend.reports.model.UserDashboardView;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDashboardViewRepository extends JpaRepository<UserDashboardView, Long> {
}