package com.finwise.finwise_backend.transactions.repository;

import com.finwise.finwise_backend.shared.enums.TransactionType;
import com.finwise.finwise_backend.transactions.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findByType(TransactionType type);

    List<Transaction> findByUserId(Long userId);
}