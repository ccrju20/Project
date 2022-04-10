package com.java.springboot.cruddemo.controller;

import java.util.List;
import java.util.Map;

import com.java.springboot.cruddemo.entity.ProductOption;
import com.java.springboot.cruddemo.service.ProductOptionsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.java.springboot.cruddemo.entity.Product;
import com.java.springboot.cruddemo.service.ProductService;

@RestController
@RequestMapping("/api/v1/products")
public class ProductRestController {

    private final ProductService productService;
    private final ProductOptionsService productOptionsService;

    @Autowired
    public ProductRestController(ProductService theProductService, ProductOptionsService theProductOptionsService) {
        productService = theProductService;
        productOptionsService = theProductOptionsService;
    }

    @GetMapping
    public ResponseEntity<Map<String, Object>> findAllPaginatedProducts(
            @RequestParam(required = false) String category,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "9") int size
    ) {
        Map<String,Object> response = productService.findPaginatedProducts(category, page, size);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<Product> findAllProducts() {
        return productService.findAllProducts();
    }

    @GetMapping("/{productId}")
    public Product getProduct(@PathVariable int productId) {
        return productService.findProductById(productId);
    }

    @PostMapping
    public ResponseEntity<Product> addProduct(@RequestBody Product theProduct) {
        productService.saveProduct(theProduct);

        return new ResponseEntity<>(theProduct, HttpStatus.CREATED);
    }

    @PutMapping
    public Product updateProduct(@RequestBody Product theProduct) {
        productService.updateProduct(theProduct);

        return theProduct;
    }

    @DeleteMapping("/{productId}")
    public String deleteProduct(@PathVariable int productId) {
        productService.deleteProductById(productId);

        return "Deleted product id - " + productId;
    }

    // For adding dummy data
    @PostMapping("/productslist")
    public void addProducts(@RequestBody List<Product> products) {
        for (Product product : products) {
            productService.saveProduct(product);
        }
    }

    /// Product Options

    @GetMapping("/options")
    public List<ProductOption> findAllOptions() {
        return productOptionsService.findAllOptions();
    }

    @GetMapping("/options/{optionId}")
    public ProductOption findOptionById(@PathVariable int optionId) {
        return productOptionsService.findOptionById(optionId);
    }

    // Get a list of product options using product id
    @GetMapping("/{productId}/options")
    public List<ProductOption> getProductOptions(@PathVariable int productId) {
        return productOptionsService.findOptionsByProductId(productId);
    }

    // Add option to an existing product
    @PostMapping("/options")
    public ResponseEntity<ProductOption> addProductOption(@RequestBody ProductOption theProductOption) {
        productOptionsService.saveOption(theProductOption);

        return new ResponseEntity<>(theProductOption, HttpStatus.CREATED);
    }

    // Edit a product option
    @PutMapping("/options")
    public ProductOption updateProductOption(@RequestBody ProductOption theProductOption) {
        productOptionsService.updateOption(theProductOption);

        return theProductOption;
    }

    // Deleting product option using option_id
    @DeleteMapping("/options/{productOptionId}")
    public String deleteProductOption(@PathVariable int productOptionId) {
        productOptionsService.deleteOptionById(productOptionId);

        return "Deleted product option id - " + productOptionId;
    }

}
