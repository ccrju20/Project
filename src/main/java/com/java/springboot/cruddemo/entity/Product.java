package com.java.springboot.cruddemo.entity;

import java.util.List;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="product")
public class Product {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private String title;

	private String description;
	
	private String img;

	private String category;
	
	private int active;
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="product_id")
	private List<ProductOption> options;
	
	public Product() {
		
	}

	public Product(String title, String description, String img, String category, int active,
			List<ProductOption> options) {
		this.title = title;
		this.description = description;
		this.img = img;
		this.category = category;
		this.active = active;
		this.options = options;
	}

	public List<ProductOption> getOptions() {
		return options;
	}

	public void setOptions(List<ProductOption> options) {
		this.options = options;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}
	
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	public String getImg() {
		return img;
	}
	
	public void setImg(String img) {
		this.img = img;
	}
	

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getActive() {
		return active;
	}

	public void setActive(int active) {
		this.active = active;
	}

}
