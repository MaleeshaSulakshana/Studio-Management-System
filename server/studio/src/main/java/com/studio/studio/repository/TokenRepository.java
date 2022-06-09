package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Token;

public interface TokenRepository extends JpaRepository<Token, String> {

}
