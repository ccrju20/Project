package com.java.springboot.cruddemo.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	private String ordernumber;
	
	private String dateposted;
	
	private String scheduled;
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="orderid")
	private List<OrderItem> orderItems;
	
	public Order() {
		
	}

	public Order(String ordernumber, String dateposted, String scheduled) {
		super();
		this.ordernumber = ordernumber;
		this.dateposted = dateposted;
		this.scheduled = scheduled;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getOrdernumber() {
		return ordernumber;
	}

	public void setOrdernumber(String ordernumber) {
		this.ordernumber = ordernumber;
	}

	public String getDateposted() {
		return dateposted;
	}

	public void setDateposted(String dateposted) {
		this.dateposted = dateposted;
	}

	public List<OrderItem> getOrderItems() {
		return orderItems;
	}

	public void setOrderItems(List<OrderItem> orderItems) {
		this.orderItems = orderItems;
	}
	
	public String getScheduled() {
		return scheduled;
	}

	public void setScheduled(String scheduled) {
		this.scheduled = scheduled;
	}

	public void add(OrderItem orderItem) {
		if (orderItems == null) {
			orderItems = new ArrayList<>();
		}
		
		orderItems.add(orderItem);
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", ordernumber=" + ordernumber + ", dateposted=" + dateposted + "]";
	}
	
	
	
}
