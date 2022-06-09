package com.studio.studio.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="items")
public class Item {
	
	@Id
	@Column(name="id")
	private String id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="qty")
	private String qty;
	
	@Column(name="price")
	private String price;
	
	@Column(name="type")
	private String type;
	
	@Column(name="item_desc")
	private String desc;
	
	@Column(name="image")
	private String image;
	
	public Item() {}

	public Item(String id, String name, String qty, String price, String type, String desc, String image) {
		super();
		this.id = id;
		this.name = name;
		this.qty = qty;
		this.price = price;
		this.type = type;
		this.desc = desc;
		this.image = image;
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

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}
