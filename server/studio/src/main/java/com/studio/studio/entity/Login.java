package com.studio.studio.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employee")
public class Login {
	
	@Id
	@Column(name="email")
	private String email;
	
	@Column(name="psw")
	private String psw;
	
	@Column(name="id")
	private String id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="type")
	private String type;

	public Login() { }

	public Login(String email, String psw, String id, String name, String type) {
		super();
		this.email = email;
		this.psw = psw;
		this.id = id;
		this.name = name;
		this.type = type;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPsw() {
		return psw;
	}

	public void setPsw(String psw) {
		this.psw = psw;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
}
