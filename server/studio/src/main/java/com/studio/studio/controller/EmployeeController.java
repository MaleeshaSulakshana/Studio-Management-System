package com.studio.studio.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.studio.studio.repository.EmployeeRepository;
import com.studio.studio.entity.*;
import com.studio.studio.exception.ResourceNotFoundException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

	@Autowired
	private EmployeeRepository employeeRepostory;

//	Get all employees
	@GetMapping
	public List<Employee> getAllEmployees(){
		return this.employeeRepostory.findAll();
	}
	
//	Get employee by id
	@GetMapping("/{id}")
	public Employee getEmployeeById(@PathVariable (value = "id") String EmployeeId) {
		return this.employeeRepostory.findById(EmployeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found!"));
	}

//	Create employee
	@PostMapping
	public Employee createEmployee(@RequestBody Employee employee) {
		return this.employeeRepostory.save(employee);
	}

//	Update employee
	@PutMapping("/{id}")
	public Employee updateEmployee(@RequestBody Employee employee, @ PathVariable ("id") String employeeId) {
		Employee existingEmployee = this.employeeRepostory.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found by this id!"));
		
		existingEmployee.setName(employee.getName());
		existingEmployee.setAddress(employee.getAddress());
		existingEmployee.setEmail(employee.getEmail());
		existingEmployee.setNumber(employee.getNumber());
		existingEmployee.setQualifications(employee.getQualifications());
		return this.employeeRepostory.save(existingEmployee);
	}
	
//	Delete employee
	@DeleteMapping("/{id}")
	public ResponseEntity<Employee> deleteEmployee(@PathVariable ("id") String employeeId) {
		Employee existingEmployee = this.employeeRepostory.findById(employeeId)
				.orElseThrow(() -> new ResourceNotFoundException("Employee not found by this id!"));
		this.employeeRepostory.delete(existingEmployee);
		return ResponseEntity.ok().build();
	}
	
}
