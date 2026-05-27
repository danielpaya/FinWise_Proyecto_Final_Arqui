package com.finwise.finwise_backend.categories.repository;

import com.finwise.finwise_backend.categories.model.Category;
import com.finwise.finwise_backend.shared.enums.CategoryType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    List<Category> findByType(CategoryType type);
}