package com.java.springboot.cruddemo.models;

import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.Collection;
import java.util.Collections;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.java.springboot.cruddemo.entity.ContactInfo;

@Entity
@Table(name="my_user")
public class MyUser implements UserDetails {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	@NotNull
	private String email;

	@NotNull
	private String password;
	
	private String createdAt;
	
	@OneToOne(fetch=FetchType.LAZY, cascade=CascadeType.ALL)
	@JoinColumn(name="contact_info")
	private ContactInfo contactInfo;

	@Enumerated(EnumType.STRING)
	private MyUserRole roles;

	public MyUser() {

	}

	public MyUser(String email, String password, MyUserRole myUserRole, ContactInfo contactInfo) {
		this.email = email;
		this.password = password;
		this.roles = myUserRole;
		this.contactInfo = contactInfo;
	}
	
	public int getId() {
		return id;
	}
	
	@JsonIgnore
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		SimpleGrantedAuthority authority = new SimpleGrantedAuthority(roles.name());
		return Collections.singletonList(authority);
	}

	@Override
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@JsonIgnore
	@Override
	public String getUsername() {
		return email;
	}

	public String getEmail() {
		return email;
	}
	
	public String getCreatedAt() {
		return createdAt;
	}
	
	public void setCreatedAt() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MM/dd/yyyy");
        LocalDate now = LocalDate.now(ZoneId.of("America/New_York"));
        String str = now.format(formatter);
        this.createdAt = str;
	}
	
	@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"}) 
	public ContactInfo getContactInfo() {
		return contactInfo;
	}

	public void setContactInfo(ContactInfo contactInfo) {
		this.contactInfo = contactInfo;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@JsonIgnore
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@JsonIgnore
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	
	@JsonIgnore
	@Override
	public boolean isEnabled() {
		return true;
	}

}
