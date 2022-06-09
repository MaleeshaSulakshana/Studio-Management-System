package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, String> {
	
}
