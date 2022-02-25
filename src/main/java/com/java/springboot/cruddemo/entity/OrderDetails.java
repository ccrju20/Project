package com.java.springboot.cruddemo.entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Entity
@Table(name="order_details")
public class OrderDetails {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	@Column(name="id")
	private int id;
	
	@NotEmpty
	private String firstname;
	
	@NotEmpty
	private String lastname;
	
	@NotEmpty
	@Email
	private String email;
	
	@NotEmpty
	@Size(min = 10, message = "number should have at least 10 digits")
	private String phone;
	
	private String address;
	
	private String addresstwo;

	private String city;
	
	private String state;
	
	private String postal;
		
	public OrderDetails() {
		
	}
	
	public OrderDetails(String firstname, String lastname, String email, String phone) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
	}

	public OrderDetails(String firstname, String lastname, String email, String phone, String address, String addresstwo,
			String city, String state, String postal) {
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.address = address;
		this.addresstwo = addresstwo;
		this.city = city;
		this.state = state;
		this.postal = postal;
	}


	public int getId() {
		return id;
	}


	public void setId(int id) {
		this.id = id;
	}


	public String getFirstname() {
		return firstname;
	}


	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}


	public String getLastname() {
		return lastname;
	}


	public void setLastname(String lastname) {
		this.lastname = lastname;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public String getAddresstwo() {
		return addresstwo;
	}


	public void setAddresstwo(String addresstwo) {
		this.addresstwo = addresstwo;
	}


	public String getCity() {
		return city;
	}


	public void setCity(String city) {
		this.city = city;
	}


	public String getState() {
		return state;
	}


	public void setState(String state) {
		this.state = state;
	}


	public String getPostal() {
		return postal;
	}


	public void setPostal(String postal) {
		this.postal = postal;
	}


	@Override
	public String toString() {
		return "Customer [id=" + id + ", firstname=" + firstname + ", lastname=" + lastname + ", email=" + email
				+ ", phone=" + phone + ", address=" + address + ", addresstwo=" + addresstwo + ", city=" + city
				+ ", state=" + state + ", postal=" + postal + "]";
	}

}
