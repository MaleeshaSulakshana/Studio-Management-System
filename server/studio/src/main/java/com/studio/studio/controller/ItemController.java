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

import com.studio.studio.entity.Item;
import com.studio.studio.exception.ResourceNotFoundException;
import com.studio.studio.repository.ItemRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/items")
public class ItemController {
	
	@Autowired
	private ItemRepository itemRepository;

//	Get all items
	@GetMapping
	public List<Item> getAllItems(){
		return this.itemRepository.findAll();
	}
	
//	Get items by id
	@GetMapping("/{id}")
	public Item getItemById(@PathVariable (value = "id") String ItemId) {
		return this.itemRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found!"));
	}

//	Create items
	@PostMapping
	public Item createItem(@RequestBody Item item) {
		return this.itemRepository.save(item);
	}

//	Update items
	@PutMapping("/{id}")
	public Item updateItem(@RequestBody Item item, @ PathVariable ("id") String ItemId) {
		Item existingItem= this.itemRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found by this id!"));
		
		existingItem.setName(item.getName());
		existingItem.setQty(item.getQty());
		existingItem.setPrice(item.getPrice());
		existingItem.setDesc(item.getDesc());
		return this.itemRepository.save(existingItem);
	}
	
//	Delete items
	@DeleteMapping("/{id}")
	public ResponseEntity<Item> deleteItem(@PathVariable ("id") String ItemId) {
		Item existingItem = this.itemRepository.findById(ItemId)
				.orElseThrow(() -> new ResourceNotFoundException("Item not found by this id!"));
		this.itemRepository.delete(existingItem);
		return ResponseEntity.ok().build();
	}
	
}
