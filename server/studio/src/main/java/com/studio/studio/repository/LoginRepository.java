package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Login;

public interface LoginRepository extends JpaRepository<Login, String> {

}
