package com.studio.studio.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.studio.entity.Login;
import com.studio.studio.repository.LoginRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login")
public class LoginController {
	
	@Autowired
	private LoginRepository loginRepository;
	
//	Create login
	@PostMapping
	public String userLogin(@RequestBody Login credientials) {
		
		Optional<Login> isAvaliable = this.loginRepository.findById(credientials.getEmail());
		if (isAvaliable.isEmpty()) {
			return "error";
		} else {
			String psw = isAvaliable.get().getPsw();

			if (psw.equals(credientials.getPsw())) {
				return isAvaliable.get().getType()+"$"+isAvaliable.get().getId();
			} else {
				return "error";
			}
		}
		
	}

}
