package com.studio.studio.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="comments")
public class Comment {

	@Id
	@Column(name="id")
	private String id;
	
	@Column(name="album_id")
	private String album_id;
	
	@Column(name="name")
	private String name;
	
	@Column(name="comment")
	private String comment;

	public Comment() { }

	public Comment(String id, String album_id, String name, String comment) {
		super();
		this.id = id;
		this.album_id = album_id;
		this.name = name;
		this.comment = comment;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getAlbum_id() {
		return album_id;
	}

	public void setAlbum_id(String album_id) {
		this.album_id = album_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	
}
