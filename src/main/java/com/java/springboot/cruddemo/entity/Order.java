package com.java.springboot.cruddemo.entity;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;
import java.util.UUID;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import org.hibernate.annotations.Type;

@Entity
@Table(name="orders")
public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	
	@Column(nullable=false)
	private String ordernumber;
	
	@Column(nullable=false)
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	private LocalDateTime dateposted;
	
	@NotEmpty
	private String scheduled;

	@Enumerated(EnumType.STRING)
	private OrderStatus status;
	
	@Min(value = 0)
	@Max(value = 1)
	private int delivery;

	@Type(type = "uuid-char")
	private UUID account;

	@NotNull
	@OneToMany(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="orderid")
	private List<OrderItem> orderItems;
	
	@Valid
	@NotNull
	@OneToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="details_id")
	private OrderDetails orderDetails;
	
	public Order() {
		
	}

	public Order(String ordernumber, LocalDateTime dateposted, String scheduled, OrderStatus status, int delivery, UUID account,
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

	public LocalDateTime getDateposted() {
//		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss");
//		String formattedDate = dateposted.format(formatter);
//		return formattedDate;
		return dateposted;
	}
	
	public void setDateposted() {
		this.dateposted = LocalDateTime.now();
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

	public OrderStatus getStatus() {
		return status;
	}

	public void setStatus(OrderStatus orderStatus) {
		this.status = orderStatus;
	}

	public int getDelivery() {
		return delivery;
	}

	public void setDelivery(int delivery) {
		this.delivery = delivery;
	}

	public UUID getAccount() {
		return account;
	}

	public void setAccount(UUID account) {
		this.account = account;
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
		return "Order{" +
				"id=" + id +
				", ordernumber='" + ordernumber + '\'' +
				", dateposted=" + dateposted +
				", scheduled='" + scheduled + '\'' +
				", status=" + status +
				", delivery=" + delivery +
				", account=" + account +
				", orderItems=" + orderItems +
				", orderDetails=" + orderDetails +
				'}';
	}
}
