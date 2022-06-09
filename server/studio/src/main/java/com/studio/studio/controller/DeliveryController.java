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

import com.studio.studio.entity.Delivery;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.DeliveryRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/delivery")
public class DeliveryController {

	@Autowired
	private DeliveryRepository deliveryRepository;

//	Get all delivery
	@GetMapping
	public List<Delivery> getAllDelivery(){
		return this.deliveryRepository.findAll();
	}
	
//	Get delivery by id
	@GetMapping("/{id}")
	public Delivery getDeliveryById(@PathVariable (value = "id") String ItemId) {
		return this.deliveryRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found!"));
	}

//	Create delivery
	@PostMapping
	public Delivery createDelivery(@RequestBody Delivery delivery) {
		return this.deliveryRepository.save(delivery);
	}

//	Update delivery
	@PutMapping("/{id}")
	public Delivery updateDelivery(@RequestBody Delivery delivery, @ PathVariable ("id") String ItemId) {
		Delivery existingDelivery= this.deliveryRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found by this id!"));
		
		existingDelivery.setStatus(delivery.getStatus());
		return this.deliveryRepository.save(existingDelivery);
	}
	
//	Update delivery
	@PutMapping("/person/{id}")
	public Delivery updateDeliveryPerson(@RequestBody Delivery delivery, @ PathVariable ("id") String ItemId) {
		Delivery existingDelivery= this.deliveryRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found by this id!"));
		
		existingDelivery.setPerson(delivery.getPerson());
		return this.deliveryRepository.save(existingDelivery);
	}
	
//	Delete delivery
	@DeleteMapping("/{id}")
	public ResponseEntity<Delivery> deleteDelivery(@PathVariable ("id") String ItemId) {
		Delivery existingDelivery = this.deliveryRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Delivery not found by this id!"));
		this.deliveryRepository.delete(existingDelivery);
		return ResponseEntity.ok().build();
	}
	
}
