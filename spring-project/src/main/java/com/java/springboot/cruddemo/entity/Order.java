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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.java.springboot.cruddemo.models.MyUser;

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
	
	@Column(name="status")
	private String status;
	
	@Column(name="delivery")
	private int delivery;
	
	@ManyToOne
	@JoinColumn(name="account_id")
	private MyUser account;
	
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="orderid")
	private List<OrderItem> orderItems;
	
	@OneToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="details_id")
	private OrderDetails orderDetails;
	
	public Order() {
		
	}

	public Order(String ordernumber, String dateposted, String scheduled, String status, int delivery, MyUser account,
			List<OrderItem> orderItems, OrderDetails orderDetails) {
		this.ordernumber = ordernumber;
		this.dateposted = dateposted;
		this.scheduled = scheduled;
		this.status = status;
		this.delivery = delivery;
		this.account = account;
		this.orderItems = orderItems;
		this.orderDetails = orderDetails;
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

	public String getDateposted() {
		return dateposted;
	}
	
	public void setDateposted() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
        LocalDateTime now = LocalDateTime.now(ZoneId.of("America/New_York"));
        String str = now.format(formatter);
        this.dateposted = str;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public int getDelivery() {
		return delivery;
	}

	public void setDelivery(int delivery) {
		this.delivery = delivery;
	}

//	@JsonIgnore
	public MyUser getAccount() {
		return account;
	}

	public void setAccount(MyUser account) {
		this.account = account;
	}

	public void add(OrderItem orderItem) {
		if (orderItems == null) {
			orderItems = new ArrayList<>();
		}
		
		orderItems.add(orderItem);
	}

	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	public OrderDetails getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(OrderDetails orderDetails) {
		this.orderDetails = orderDetails;
	}

	@Override
	public String toString() {
		return "Order [id=" + id + ", ordernumber=" + ordernumber + ", dateposted=" + dateposted + "]";
	}
	
	
	
}
