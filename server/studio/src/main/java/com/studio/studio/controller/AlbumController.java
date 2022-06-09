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

import com.studio.studio.entity.Album;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.AlbumRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/album")
public class AlbumController {
	
	@Autowired
	private AlbumRepository albumRepository;

//	Get all album
	@GetMapping
	public List<Album> getAllAlbums(){
		return this.albumRepository.findAll();
	}
	
//	Get album by id
	@GetMapping("/{id}")
	public Album getAlbumById(@PathVariable (value = "id") String AlbumId) {
		return this.albumRepository.findById(AlbumId)
				.orElseThrow(() -> new ResourceNotFoundException("Album not found!"));
	}

//	Create album
	@PostMapping
	public Album createAlbum(@RequestBody Album album) {
		return this.albumRepository.save(album);
	}

//	Update album
	@PutMapping("/{id}")
	public Album updateAlbum(@RequestBody Album album, @PathVariable ("id") String AlbumId) {
		Album existingAlbum= this.albumRepository.findById(AlbumId)
				.orElseThrow(() -> new ResourceNotFoundException("Album not found by this id!"));
		
		existingAlbum.setTitle(album.getTitle());
		existingAlbum.setDesc(album.getDesc());
		return this.albumRepository.save(existingAlbum);
	}
	
//	Delete album
	@DeleteMapping("/{id}")
	public ResponseEntity<Album> deleteAlbum(@PathVariable ("id") String AlbumId) {
		Album existingAlbum= this.albumRepository.findById(AlbumId)
				.orElseThrow(() -> new ResourceNotFoundException("Album not found by this id!"));
		this.albumRepository.delete(existingAlbum);
		return ResponseEntity.ok().build();
	}

}
