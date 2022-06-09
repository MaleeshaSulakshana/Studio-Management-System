package com.studio.studio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.studio.entity.Token;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.TokenRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/token")
public class TokenController {

	@Autowired
	private TokenRepository tokenRepository;

//	Get all token
	@GetMapping
	public List<Token> getAllToken(){
		return this.tokenRepository.findAll();
	}
	
//	Get token by id
	@GetMapping("/{id}")
	public Token getTokenById(@PathVariable (value = "id") String TokenId) {
		return this.tokenRepository.findById(TokenId)
				.orElseThrow(() -> new ResourceNotFoundException("Token not found!"));
	}

//	Create token
	@PostMapping
	public Token createToken(@RequestBody Token token) {
		return this.tokenRepository.save(token);
	}
	
}
