package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Event;

public interface EventRepository extends JpaRepository<Event, String>{

}
