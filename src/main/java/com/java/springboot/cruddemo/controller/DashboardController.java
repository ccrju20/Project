package com.java.springboot.cruddemo.controller;

import com.java.springboot.cruddemo.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/dashboard")
public class DashboardController {

    private final DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/today")
    public BigDecimal getTotalToday() {
        return dashboardService.getTotalToday();
    }

    @GetMapping("/line")
    public ResponseEntity<Map<LocalDate, BigDecimal>> getLineChartData() {
        Map<LocalDate, BigDecimal> response = dashboardService.getPaymentsFrom();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/pie")
    public ResponseEntity<Map<String, Integer>> getProductData() {
        Map<String, Integer> response = dashboardService.getProductData();
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/pending")
    public int getTotalPending() {
        return dashboardService.totalPendingOrders();
    }

}