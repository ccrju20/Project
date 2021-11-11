package com.java.springboot.cruddemo.entity;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="orders")
public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@Column(name="ordernumber")
	private String ordernumber;
	
	@Column(name="dateposted")
	private String dateposted;
	
	@Column(name="scheduled")
	private String scheduled;
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="orderid")
	private List<OrderItem> orderItems;
	
	@OneToOne(fetch=FetchType.LAZY, cascade={CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
	@JoinColumn(name="customerid")
	private Customer customer;
	
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
	
	public void setOrdernumber() {
		String alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		String numeric = "0123456789";
		
        Random random = new Random();
        StringBuilder builder = new StringBuilder(8);
        builder.append(alpha.charAt(random.nextInt(alpha.length())));

        for (int i = 0; i < 7; i++) {
            builder.append(numeric.charAt(random.nextInt(numeric.length())));
            }
        this.ordernumber = builder.toString();
	}

//	public void setOrdernumber(String ordernumber) {
//		this.ordernumber = ordernumber;
//	}

	public String getDateposted() {
		return dateposted;
	}
	
	public void setDateposted() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now(ZoneId.of("America/New_York"));
        String str = now.format(formatter);
        this.dateposted = str;
	}

//	public void setDateposted(String dateposted) {
//		this.dateposted = dateposted;
//	}

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

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", ordernumber=" + ordernumber + ", dateposted=" + dateposted + "]";
	}
	
	
	
}
