package com.java.springboot.cruddemo.dto;

import com.java.springboot.cruddemo.entity.Product;

import java.time.LocalDateTime;

public class ProductData {

   private LocalDateTime dateposted;

   private int quantity;

   private Product product;

    public ProductData() {
    }

    public ProductData(LocalDateTime dateposted, int quantity, Product product) {
        this.dateposted = dateposted;
        this.quantity = quantity;
        this.product = product;
    }

    public LocalDateTime getDateposted() {
        return dateposted;
    }

    public void setDateposted(LocalDateTime dateposted) {
        this.dateposted = dateposted;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

}
