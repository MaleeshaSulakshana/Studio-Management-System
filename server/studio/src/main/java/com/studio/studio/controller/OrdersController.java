package com.studio.studio.controller;

import java.util.List;
import java.util.Optional;

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

import com.studio.studio.entity.Orders;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.OrdersRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrdersController {

	@Autowired
	private OrdersRepository ordersRepository;

//	Get all orders
	@GetMapping
	public List<Orders> getAllOrders(){
		return this.ordersRepository.findAll();
	}
	
//	Get order by id
	@GetMapping("/{id}")
	public Orders getOrdersById(@PathVariable (value = "id") String ItemId) {
		return this.ordersRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found!"));
	}
	
//	Get order is exist by id
	@GetMapping("/exist/{id}")
	public String checkOrderExistById(@PathVariable (value = "id") String ItemId) {
		
		Optional<Orders> isAvaliable = this.ordersRepository.findById(ItemId);
		if (isAvaliable.isEmpty()) {
			return "error";
		} else {
			return "exist";
		}
		
	}

//	Create order
	@PostMapping
	public Orders createOrders(@RequestBody Orders orders) {
		return this.ordersRepository.save(orders);
	}


//	Update order details
	@PutMapping("/update/{id}")
	public Orders updateOrderDetails(@RequestBody Orders orders, @ PathVariable ("id") String ItemId) {
		Orders existingOrders= this.ordersRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found by this id!"));
		
		existingOrders.setName(orders.getName());
		existingOrders.setAddress(orders.getAddress());
		existingOrders.setEmail(orders.getEmail());
		existingOrders.setNumber(orders.getNumber());
		return this.ordersRepository.save(existingOrders);
	}
	
	
//	Update order
	@PutMapping("/{id}")
	public Orders updateOrders(@RequestBody Orders orders, @ PathVariable ("id") String ItemId) {
		Orders existingOrders= this.ordersRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found by this id!"));
		
		existingOrders.setStatus(orders.getStatus());
		return this.ordersRepository.save(existingOrders);
	}
	
//	Delete order
	@DeleteMapping("/{id}")
	public ResponseEntity<Orders> deleteOrders(@PathVariable ("id") String ItemId) {
		Orders existingOrders = this.ordersRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Order not found by this id!"));
		this.ordersRepository.delete(existingOrders);
		return ResponseEntity.ok().build();
	}
	
}
