package com.studio.studio.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.studio.studio.entity.Comment;

public interface CommentsRepository extends JpaRepository<Comment, String> {

}