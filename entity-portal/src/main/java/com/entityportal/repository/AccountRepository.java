package com.entityportal.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.entityportal.entity.Account;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long> {
	
	@Query(value = "SELECT DISTINCT account_number FROM account" , nativeQuery = true)
	List<String> findDistinctAccountNumber();

	List<Account> findAllByOrderByDateDesc();
	
}
