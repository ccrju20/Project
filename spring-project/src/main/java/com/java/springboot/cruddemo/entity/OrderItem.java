package com.java.springboot.cruddemo.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="order_items")
public class OrderItem {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="quantity")
	private String quantity;
	
	@Column(name="total_price")
	private String total_price;
	
	@OneToOne
	@JoinColumn(name="productid")
	private Product product;
	
	@OneToOne
	@JoinColumn(name="product_option")
	private ProductOption productOption;
			
	public OrderItem() {
		
	}

	public OrderItem(String quantity, String total_price, Product product, ProductOption productOption) {
		this.quantity = quantity;
		this.total_price = total_price;
		this.product = product;
		this.productOption = productOption;
	}


	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getTotal_price() {
		return total_price;
	}

	public void setTotal_price(String total_price) {
		this.total_price = total_price;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}
	
	public ProductOption getProductOption() {
		return productOption;
	}
	
	public void setProductOption(ProductOption productOption) {
		this.productOption = productOption;
	}

	@Override
	public String toString() {
		return "OrderItem [id=" + id + ", quantity=" + quantity + ", total_price=" + total_price + ", product="
				+ product + "]";
	}
	
}
