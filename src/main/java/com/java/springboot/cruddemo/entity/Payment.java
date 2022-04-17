package com.java.springboot.cruddemo.entity;

import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name="payment")
public class Payment {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private int id;

    private String paymentId;

    private BigDecimal amount;

    private LocalDateTime created;

    public Payment() {

    }
    public Payment(String paymentId, BigDecimal amount, LocalDateTime created) {
        this.paymentId = paymentId;
        this.amount = amount;
        this.created = created;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDateTime getCreated() {
        return created;
    }

    public void setCreated(LocalDateTime created) {
        this.created = created;
    }
}
