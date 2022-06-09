package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Delivery;

public interface DeliveryRepository extends JpaRepository<Delivery, String> {

}