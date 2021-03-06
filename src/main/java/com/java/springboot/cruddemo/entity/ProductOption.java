package com.java.springboot.cruddemo.entity;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.math.BigDecimal;

@Entity
@Table(name="product_options")
public class ProductOption {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	private int option_id;

	private BigDecimal price;
	
	private int size; 
	
	@ManyToOne
	@JoinColumn(name="product_id")
	private Product product;
	
	public ProductOption() {
		
	}

	public ProductOption(int option_id, BigDecimal price, int size, Product product) {
		this.option_id = option_id;
		this.price = price;
		this.size = size;
		this.product = product;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getOption_id() {
		return option_id;
	}

	public void setOption_id(int option_id) {
		this.option_id = option_id;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}
	
	@JsonIgnore
	public Product getProduct() {
		return product;
	}
	
	@JsonProperty
	public void setProduct(Product product) {
		this.product = product;
	}
	
}
