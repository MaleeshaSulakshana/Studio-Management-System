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

import com.studio.studio.entity.Event;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.EventRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/event")
public class EventController {

	@Autowired
	private EventRepository eventRepostory;

//	Get all events
	@GetMapping
	public List<Event> getAllEvents(){
		return this.eventRepostory.findAll();
	}
	
//	Get event by id
	@GetMapping("/{id}")
	public Event getEventById(@PathVariable (value = "id") String EventId) {
		return this.eventRepostory.findById(EventId)
				.orElseThrow(() -> new ResourceNotFoundException("Event not found!"));
	}

//	Get event is exist by id
	@GetMapping("/exist/{id}")
	public String checkEventExistById(@PathVariable (value = "id") String EventId) {
		
		Optional<Event> isAvaliable = this.eventRepostory.findById(EventId);
		if (isAvaliable.isEmpty()) {
			return "error";
		} else {
			return "exist";
		}
		
	}
	
//	Create event
	@PostMapping
	public Event createEvent(@RequestBody Event event) {
			
		return this.eventRepostory.save(event);
	}

//	Update event
	@PutMapping("/{id}")
	public Event updateEvent(@RequestBody Event event, @ PathVariable ("id") String eventId) {
		Event existingEvent= this.eventRepostory.findById(eventId)
				.orElseThrow(() -> new ResourceNotFoundException("Event not found by this id!"));
		
		existingEvent.setName(event.getName());
		existingEvent.setAddress(event.getAddress());
		existingEvent.setEmail(event.getEmail());
		existingEvent.setNumber(event.getNumber());
		existingEvent.setDate(event.getDate());
		existingEvent.setTime(event.getTime());
		return this.eventRepostory.save(existingEvent);
	}
	
//	Update set assign employee for event
	@PutMapping("/assign/{id}")
	public Event updateEventAssign(@RequestBody Event event, @ PathVariable ("id") String eventId) {
		Event existingEvent= this.eventRepostory.findById(eventId)
				.orElseThrow(() -> new ResourceNotFoundException("Event not found by this id!"));
		
		existingEvent.setAssign(event.getAssign());
		return this.eventRepostory.save(existingEvent);
	}
	
//	Update set status for event
	@PutMapping("/status/{id}")
	public Event updateEventStatus(@RequestBody Event event, @ PathVariable ("id") String eventId) {
		Event existingEvent= this.eventRepostory.findById(eventId)
				.orElseThrow(() -> new ResourceNotFoundException("Event not found by this id!"));
		
		existingEvent.setStatus(event.getStatus());
		return this.eventRepostory.save(existingEvent);
	}
	
//	Delete event
	@DeleteMapping("/{id}")
	public ResponseEntity<Event> deleteEvent(@PathVariable ("id") String eventId) {
		Event existingEvent = this.eventRepostory.findById(eventId)
				.orElseThrow(() -> new ResourceNotFoundException("Event not found by this id!"));
		this.eventRepostory.delete(existingEvent);
		return ResponseEntity.ok().build();
	}
	
}
