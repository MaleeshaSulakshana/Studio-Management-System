package com.studio.studio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.studio.entity.Comment;
import com.studio.studio.repository.CommentsRepository ;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentController {
	
	@Autowired
	private CommentsRepository commentsRepository ;
	
//	Get all comment
	@GetMapping
	public List<Comment> getAllComments(){
		return this.commentsRepository.findAll();
	}

//	Create comment
	@PostMapping
	public Comment createComment(@RequestBody Comment comment) {
		return this.commentsRepository.save(comment);
	}

}
