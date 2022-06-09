package com.studio.studio.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="employee")
public class Employee {
	
	@Id
	@Column(name="id")
	private String id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="number")
	private String number;
	
	@Column(name="address")
	private String address;
	
	@Column(name="qualifications")
	private String qualifications;
	
	@Column(name="email")
	private String email;
	
	@Column(name="psw")
	private String psw;
	
	@Column(name="type")
	private String type;
	
	public Employee() {}
	
	public Employee(String id, String name, String number, String address, String qualifications, String email,
			String psw, String type) {
		super();
		this.id = id;
		this.name = name;
		this.number = number;
		this.address = address;
		this.qualifications = qualifications;
		this.email = email;
		this.psw = psw;
		this.type = type;
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
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getQualifications() {
		return qualifications;
	}
	public void setQualifications(String qualifications) {
		this.qualifications = qualifications;
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
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
	
}
