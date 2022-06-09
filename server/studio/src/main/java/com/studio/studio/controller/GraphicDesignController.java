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

import com.studio.studio.entity.GraphicDesign;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.GraphicDesignRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/graphicdesign")
public class GraphicDesignController {

	@Autowired
	private GraphicDesignRepository graphicDesignRepository;

//	Get all graphic design
	@GetMapping
	public List<GraphicDesign> getAllGraphicDesigns(){
		return this.graphicDesignRepository.findAll();
	}
	
//	Get graphic design by id
	@GetMapping("/{id}")
	public GraphicDesign getGraphicDesignById(@PathVariable (value = "id") String GraphicDesignId) {
		return this.graphicDesignRepository.findById(GraphicDesignId)
				.orElseThrow(() -> new ResourceNotFoundException("Graphic design not found!"));
	}
	
//	Get graphic is exist by id
	@GetMapping("/exist/{id}")
	public String checkOrderExistById(@PathVariable (value = "id") String ItemId) {
		
		Optional<GraphicDesign> isAvaliable = this.graphicDesignRepository.findById(ItemId);
		if (isAvaliable.isEmpty()) {
			return "error";
		} else {
			return "exist";
		}
		
	}

//	Create graphic design
	@PostMapping
	public GraphicDesign createGraphicDesign(@RequestBody GraphicDesign graphicDesign) {
		return this.graphicDesignRepository.save(graphicDesign);
	}

//	Update graphic design
	@PutMapping("/{id}")
	public GraphicDesign updateGraphicDesign(@RequestBody GraphicDesign graphicDesign, @ PathVariable ("id") String graphicDesignId) {
		GraphicDesign existingGraphicDesign = this.graphicDesignRepository.findById(graphicDesignId)
				.orElseThrow(() -> new ResourceNotFoundException("Graphic design not found by this id!"));
		
		existingGraphicDesign.setName(graphicDesign.getName());
		existingGraphicDesign.setDescription(graphicDesign.getDescription());
		existingGraphicDesign.setNumber(graphicDesign.getNumber());
		return this.graphicDesignRepository.save(existingGraphicDesign);
	}
	
//	Update graphic design status
	@PutMapping("/status/{id}")
	public GraphicDesign updateGraphicDesignStatus(@RequestBody GraphicDesign graphicDesign, @ PathVariable ("id") String graphicDesignId) {
		GraphicDesign existingGraphicDesign = this.graphicDesignRepository.findById(graphicDesignId)
				.orElseThrow(() -> new ResourceNotFoundException("Graphic design not found by this id!"));
		
		existingGraphicDesign.setStatus(graphicDesign.getStatus());
		return this.graphicDesignRepository.save(existingGraphicDesign);
	}
	
//	Delete graphic design
	@DeleteMapping("/{id}")
	public ResponseEntity<GraphicDesign> deleteGraphicDesign(@PathVariable ("id") String graphicDesignId) {
		GraphicDesign existingGraphicDesign = this.graphicDesignRepository.findById(graphicDesignId)
				.orElseThrow(() -> new ResourceNotFoundException("Graphic design not found by this id!"));
		this.graphicDesignRepository.delete(existingGraphicDesign);
		return ResponseEntity.ok().build();
	}
	
}
